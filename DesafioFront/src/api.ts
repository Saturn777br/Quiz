import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

interface User {
  name: string;
  cpf: string;
}

interface Answer {
  answer: string;
  is_correct: boolean;
}

export const createUser = async (user: User) => {
  return api.post("/users", user);
};

export const loginUser = async (user: { cpf: string; name: string }) => {
  const response = await api.post("/login", user);
  return response.data;
};

export const getQuestions = async () => {
  const response = await api.get("/questions");
  return response.data;
};

export const submitAnswer = async (sessionId: number, questionId: number, answer: Answer) => {
  return api.post(`/quiz/answer/${sessionId}/${questionId}`, answer);
};