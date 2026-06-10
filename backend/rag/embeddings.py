# embeddings.py
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("./local_models/all-MiniLM-L6-v2")

def create_embeddings(chunks):
    return model.encode(chunks).tolist()