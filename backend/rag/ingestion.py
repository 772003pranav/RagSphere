# rag/ingestion.py
import os
from pypdf import PdfReader

from rag.chunking import create_chunks
from rag.embeddings import create_embeddings
from rag.vector_store import store_chunks

def ingest_pdf(pdf_path):
    reader = PdfReader(pdf_path)

    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    chunks = create_chunks(text)
    embeddings = create_embeddings(chunks)

    store_chunks(
        chunks,
        embeddings,
        os.path.basename(pdf_path)
    )

    return len(chunks)