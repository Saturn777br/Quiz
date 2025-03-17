import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions } from "../api";
import "../App.css"; // Importa os estilos

const Quiz = () => {
  const { sessionId, questionIndex } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null); // Estado para mostrar se a resposta está certa
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      console.log("🔄 Buscando perguntas...");
      const data = await getQuestions();
      console.log("✅ Perguntas recebidas:", data);

      if (data.length > 0) {
        setQuestions(data);
        setCurrentQuestion(data[parseInt(questionIndex || "0")]);

        setFeedback(null);

        // Buscar as respostas para a pergunta atual
        const questionId = data[parseInt(questionIndex || "0")].question_id;
        const response = await fetch(`http://localhost:8000/questions/${questionId}/answers`);
        const answerData = await response.json();
        console.log("✅ Respostas recebidas:", answerData);
        setAnswers(answerData);
      } else {
        console.warn("⚠️ Nenhuma pergunta encontrada!");
      }
    };

    loadQuestions();
  }, [questionIndex]);

  // Função para enviar a resposta para o backend
  const handleAnswer = async (answer: any) => {
    console.log("➡️ Enviando resposta para API:", answer);

    try {
      const response = await fetch(`http://localhost:8000/quiz/answer/${sessionId}/${currentQuestion.question_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_correct: answer.is_correct }),
      });

      const result = await response.json();
      console.log("✅ Resposta recebida do backend:", result);

      // Atualiza a mensagem de feedback (certa ou errada)
      setFeedback(result.message);

      // Aguarda 2 segundos antes de ir para a próxima pergunta
      setTimeout(() => {
        if (parseInt(questionIndex || "0") < questions.length - 1) {
          navigate(`/quiz/${sessionId}/${parseInt(questionIndex || "0") + 1}`);
        } else {
          navigate("/finish");
        }
      }, 2000);
    } catch (error) {
      console.error("🚨 Erro ao enviar resposta:", error);
    }
  };

  if (!currentQuestion) return <div className="loading-message">🔄 Carregando pergunta...</div>;

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.question}</h2>
      {answers.length > 0 ? (
        answers.map((answer) => (
          <button key={answer.answer_id} onClick={() => handleAnswer(answer)}>
            {answer.answer}
          </button>
        ))
      ) : (
        <p className="warning-message">⚠️ Nenhuma resposta disponível para esta pergunta.</p>
      )}

      {/* Exibe feedback sobre a resposta */}
      {feedback && <p className="feedback-message">{feedback}</p>}
    </div>
  );
};

export default Quiz;
