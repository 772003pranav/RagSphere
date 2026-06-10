import chromadb

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="documents"
)


def store_chunks(chunks, embeddings, doc_name):

    ids = [
        f"{doc_name}_{i}"
        for i in range(len(chunks))
    ]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids,
        metadatas=[
            {
                "source": doc_name
            }
            for _ in chunks
        ]
    )