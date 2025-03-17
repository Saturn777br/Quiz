from sqlmodel import SQLModel, create_engine, Session, select, Field
from typing import Optional
from datetime import datetime



class User(SQLModel, table=True):
    __tablename__ = "users"
    user_id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str]
    cpf: Optional[str]
    created_at: Optional[datetime] = Field(..., default_factory= datetime.now)

class Question(SQLModel, table=True):
    __tablename__ = "questions"
    question_id: Optional[int] = Field(default=None, primary_key=True)
    question: str
    created_at: Optional[datetime]

class Answer(SQLModel, table=True):
    __tablename__ = "answers"
    answer_id: Optional[int] = Field(default=None, primary_key=True)
    answer: str
    question_id: int
    is_correct: bool
    created_at: Optional[datetime]

    # Nova tabela para armazenar a sessão de quiz
class QuizSession(SQLModel, table=True):
    __tablename__ = "quiz_sessions"
    session_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    started_at: Optional[datetime] = Field(..., default_factory=datetime.now)
    finished_at: Optional[datetime] = None
    score: Optional[int] = 0

# Configuração do banco de dados
engine = create_engine("mysql://docker:docker@localhost:3306/desafio", echo=True)

if __name__ == "__main__":
    SQLModel.metadata.create_all(engine)

# engine = create_engine("mysql://docker:docker@localhost:3306/desafio", echo = True)

# if __name__ == "__main__":

#    with Session(engine) as session:
#        users = session.exec(select(User)).all()
#        print(users)

#    with Session(engine) as session:
#        questions = session.exec(select(Question)).all()
#        print(questions)
