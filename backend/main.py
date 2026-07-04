from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel

# Import shared model and symptom matcher
from ai_model import model
from symptom_matcher import SymptomMatcher

app = FastAPI()

# Allow React (localhost:3000) to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Minimal articles dataset (used for related articles)
articles = [
    {
        "title": "How to reduce menstrual cramps",
        "content": "Cramps can be managed with heat, hydration and exercise"
    },
    {
        "title": "Best foods for fatigue",
        "content": "Fatigue can be reduced with iron-rich foods and hydration"
    },
    {
        "title": "Why bloating happens",
        "content": "Hormonal changes cause bloating and water retention"
    }
]

# Precompute article embeddings once
article_texts = [a["content"] for a in articles]
article_embeddings = model.encode(article_texts)


@app.get("/")
def home():
    return {"message": "Backend running"}


@app.get("/recommend")
def recommend(query: str):
    query_embedding = model.encode([query])
    scores = cosine_similarity(query_embedding, article_embeddings)[0]
    top_indices = scores.argsort()[-3:][::-1]
    results = [articles[i] for i in top_indices]
    return {"results": results}


class SymptomRequest(BaseModel):
    text: str


matcher = SymptomMatcher()


@app.post("/api/symptoms")
def detect_symptoms(body: SymptomRequest):
    """Detect symptoms from natural language and return recommendations.

    Response JSON contains: detected symptoms, recommended foods, remedies, related articles.
    """
    input_text = body.text

    # Detect symptoms using the matcher
    detected = matcher.match(input_text)

    # Find related articles (reuse model + simple cosine similarity)
    q_emb = model.encode([input_text])
    scores = cosine_similarity(q_emb, article_embeddings)[0]
    top_indices = scores.argsort()[-3:][::-1]
    related = [articles[i] for i in top_indices]

    return {
        "input": input_text,
        "detected_symptoms": detected["symptoms"],
        "recommended_foods": detected["foods"],
        "recommended_remedies": detected["remedies"],
        "related_articles": related,
    }