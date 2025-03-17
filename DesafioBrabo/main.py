from fastapi import FastAPI
from pydantic import BaseModel
from dataclasses import dataclass
from db import Question, engine, User, Answer
from sqlmodel import Session, select 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, Depends
from sqlmodel import Session
from sqlmodel import select
from datetime import datetime
from uuid import uuid4
from db import QuizSession,  User, Question, Answer  # Importando a nova modelagem


# DTO Objeto de transferencia de Dados

class UserDTO(BaseModel):
    name : str
    cpf : str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Apenas o frontend pode acessar
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

@app.post("/users")
def create_user(user: UserDTO) -> str:
    with Session(engine) as session:
        new_user = User(name = user.name, cpf = user.cpf)
        session.add(new_user)
        session.commit()

        return "Usuário cadastrado com sucesso!"

#Modificado

@app.post("/login")
def login(user: UserDTO):
    with Session(engine) as session:
        print(f"🔍 Tentativa de login com CPF: {user.cpf}")  # Log para depuração
        
        db_user = session.exec(select(User).where(User.cpf == user.cpf)).first()

        if db_user is None:
            print("❌ Usuário não encontrado!")
            raise HTTPException(status_code=400, detail="Usuário não encontrado")

        print(f"✅ Login bem-sucedido! user_id: {db_user.user_id}")  # Log de sucesso
        return {"message": "Login bem-sucedido", "user_id": db_user.user_id}
#----

@app.get("/questions")
def list_questions():
    with Session(engine) as session:
        return session.exec(select(Question)).all()

@app.get("/questions/{question_id}/answers")
def list_answers(question_id: int):
    with Session(engine) as session:
        return session.exec(select(Answer).where(Answer.question_id == question_id)).all()

# Rota para iniciar o quiz
@app.post("/quiz/start")
def start_quiz(user: UserDTO):
    with Session(engine) as session:
        db_user = session.exec(select(User).where(User.cpf == user.cpf)).first()
        
        if not db_user:
            raise HTTPException(status_code=400, detail="Usuário não encontrado")

        # Criação de uma nova sessão de quiz para o usuário
        quiz_session = QuizSession(user_id=db_user.user_id)
        session.add(quiz_session)
        session.commit()
        return {"session_id": quiz_session.session_id}

# Rota para processar a resposta do usuário no quiz
@app.post("/quiz/answer/{session_id}/{question_id}")
def answer_question(session_id: int, question_id: int, answer: dict):
    with Session(engine) as session:
        # Buscar a resposta correta da pergunta
        correct_answer = session.exec(select(Answer).where(Answer.question_id == question_id, Answer.is_correct == True)).first()

        if not correct_answer:
            return {"message": "Erro: Pergunta sem resposta correta no banco de dados."}

        # Verifica se a resposta enviada é correta
        if answer["is_correct"]:
            return {"message": "✅ Resposta correta!"}
        else:
            return {"message": "❌ Resposta errada!"}