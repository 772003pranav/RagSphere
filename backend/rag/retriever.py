from rag.embeddings import model
from rag.vector_store import collection


def retrieve_chunks(question, top_k=5):

    query_embedding = model.encode(
        question
    ).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results