from typing import List, Dict
from sklearn.metrics.pairwise import cosine_similarity

from ai_model import model
from data.symptoms_data import SYMPTOM_DEFINITIONS


class SymptomMatcher:
    """Match free-text input to known symptoms using sentence embeddings.

    Usage:
        matcher = SymptomMatcher()
        matcher.match("I have cramps and feel tired")
    """

    def __init__(self, threshold: float = 0.45):
        self.threshold = threshold
        # Build canonical embedding for each symptom by encoding example phrases
        self.symptom_ids: List[str] = [s["id"] for s in SYMPTOM_DEFINITIONS]
        self.symptom_names: Dict[str, str] = {s["id"]: s["name"] for s in SYMPTOM_DEFINITIONS}
        self.symptom_foods: Dict[str, List[str]] = {s["id"]: s.get("foods", []) for s in SYMPTOM_DEFINITIONS}
        self.symptom_remedies: Dict[str, List[str]] = {s["id"]: s.get("remedies", []) for s in SYMPTOM_DEFINITIONS}

        # For each symptom, encode the joined examples and store embedding
        example_texts = [" ".join(s["examples"]) for s in SYMPTOM_DEFINITIONS]
        self.symptom_embeddings = model.encode(example_texts)

    def match(self, text: str, top_k: int = 5) -> Dict:
        """Return detected symptoms and aggregated recommendations.

        - Computes embedding for `text` and cosine similarity to each symptom.
        - Selects symptoms with similarity >= threshold.
        - Aggregates foods and remedies from detected symptoms.
        """
        q_emb = model.encode([text])
        sims = cosine_similarity(q_emb, self.symptom_embeddings)[0]

        detected = []
        foods = []
        remedies = []

        for idx, score in enumerate(sims):
            if score >= self.threshold:
                sid = self.symptom_ids[idx]
                detected.append({"id": sid, "name": self.symptom_names[sid], "score": float(score)})
                foods.extend(self.symptom_foods.get(sid, []))
                remedies.extend(self.symptom_remedies.get(sid, []))

        # Sort detected by score desc
        detected.sort(key=lambda x: x["score"], reverse=True)

        # Deduplicate recommendations while preserving order
        def unique_preserve(seq):
            seen = set()
            out = []
            for item in seq:
                if item not in seen:
                    seen.add(item)
                    out.append(item)
            return out

        foods = unique_preserve(foods)[:10]
        remedies = unique_preserve(remedies)[:10]

        return {"symptoms": detected, "foods": foods, "remedies": remedies}


__all__ = ["SymptomMatcher"]
