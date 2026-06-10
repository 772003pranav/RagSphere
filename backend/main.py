from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel

import os

from database.database import engine, Base, SessionLocal
from database.crud import create_chat, save_message

from rag.ingestion import ingest_pdf
from rag.retriever import retrieve_chunks
from rag.generator import generate_answer
from database.crud import get_sessions, get_messages
from rag.vector_store import get_uploaded_documents

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)

Base.metadata.create_all(bind=engine)


# =========================
# Request Models
# =========================

class ChatRequest(BaseModel):
    session_id: int
    question: str


# =========================
# Health Endpoint
# =========================

@app.get("/")
def home():
    return {"message": "Backend Working"}


# =========================
# Create Chat Session
# =========================

@app.post("/session")
def create_session():
    db = SessionLocal()

    try:
        chat = create_chat(db, "New Chat")

        return {
            "session_id": chat.id,
            "title": chat.title
        }

    finally:
        db.close()


# =========================
# Upload PDF
# =========================

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    path = f"uploads/{file.filename}"

    with open(path, "wb") as f:
        content = await file.read()
        f.write(content)

    chunks = ingest_pdf(path)

    return {
        "message": "Uploaded Successfully",
        "chunks": chunks
    }


# =========================
# Search Endpoint (Debug)
# =========================

@app.post("/search")
def search(request: ChatRequest):
    results = retrieve_chunks(request.question)
    return results


# =========================
# Chat Endpoint
# =========================

@app.post("/chat")
def chat(request: ChatRequest):

    db = SessionLocal()

    try:
        # Save user message
        save_message(
            db,
            request.session_id,
            "user",
            request.question
        )

        # Retrieve relevant chunks
        results = retrieve_chunks(request.question)
        chunks = results["documents"][0]

        # Generate answer
        answer = generate_answer(
            request.question,
            chunks
        )

        # Save assistant response
        save_message(
            db,
            request.session_id,
            "assistant",
            answer
        )

        return {
            "answer": answer,
            "sources": results["metadatas"][0]
        }

    finally:
        db.close()

@app.get("/sessions")
def sessions():
    db = SessionLocal()
    try:
        return get_sessions(db)
    finally:
        db.close()

@app.get("/messages/{session_id}")
def messages(session_id: int):
    db = SessionLocal()
    try:
        return get_messages(db, session_id)
    finally:
        db.close()

@app.get("/documents")
def documents():
    return {
        "documents": get_uploaded_documents()
    }