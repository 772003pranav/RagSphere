# RagSphere – AI Powered RAG Chatbot

RagSphere is a Retrieval-Augmented Generation (RAG) based chatbot that allows users to upload documents and ask intelligent, context-aware questions.

It combines FastAPI, vector search, and large language models to deliver accurate responses grounded in user-provided data.

---

## Features

- Upload PDF documents
- Automatic text chunking
- Embedding generation with offline model support
- Semantic search using vector store
- Context-aware AI responses
- Chat session persistence using SQLite
- FastAPI backend with React frontend

---

## Architecture

User Query  
↓  
Retriever → Vector Store → Relevant Chunks  
↓  
LLM (Generator)  
↓  
Final Response  

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy (SQLite)
- Sentence Transformers (Offline Model)
- ChromaDB / Vector Store

### Frontend
- React (Vite)
- Axios

---

## Project Structure

backend/
│
├── database/
├── rag/
├── routes/
├── local_models/
├── uploads/
└── main.py

frontend/
└── React application

---

## Setup Guide

### Clone Repository
```
git clone https://github.com/772003pranav/RagSphere.git
cd RagSphere
