from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

from database.database import engine
from database.database import Base

from pydantic import BaseModel

import os

from rag.ingestion import ingest_pdf
from rag.retriever import retrieve_chunks
from rag.generator import generate_answer

app = FastAPI()

os.makedirs(
    "uploads",
    exist_ok=True
)


# Health Endpoint
@app.get("/")
def home():
    return {
        "message": "Backend Working"
    }


# Upload Endpoint
@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    path = f"uploads/{file.filename}"

    with open(path, "wb") as f:
        f.write(
            await file.read()
        )

    chunks = ingest_pdf(path)

    return {
        "message": "Uploaded Successfully",
        "chunks": chunks
    }


# Request Model
class ChatRequest(BaseModel):
    question: str


# Debug Search Endpoint
@app.post("/search")
def search(
    request: ChatRequest
):

    results = retrieve_chunks(
        request.question
    )

    return results


# Final Chat Endpoint (RAG)
@app.post("/chat")
def chat(
    request: ChatRequest
):

    results = retrieve_chunks(
        request.question
    )

    chunks = results["documents"][0]

    answer = generate_answer(
        request.question,
        chunks
    )

    return {
        "answer": answer,
        "sources": results["metadatas"][0]
    }

Base.metadata.create_all(bind=engine)