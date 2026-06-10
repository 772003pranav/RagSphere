from database.models import ChatSession
from database.models import Message


def create_chat(db, title):
    chat = ChatSession(
        title=title
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


def save_message(
    db,
    session_id,
    sender,
    content
):
    msg = Message(
        session_id=session_id,
        sender=sender,
        content=content
    )

    db.add(msg)
    db.commit()

    return msg


def get_messages(db, session_id):
    return db.query(Message).filter(
        Message.session_id == session_id
    ).all()