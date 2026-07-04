from sentence_transformers import SentenceTransformer


# Initialize and export a single SentenceTransformer model instance so it can
# be reused across modules without reloading multiple times.
model = SentenceTransformer("all-MiniLM-L6-v2")
