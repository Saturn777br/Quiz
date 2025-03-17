import { useParams, useNavigate } from "react-router-dom";

const Start = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo ao Quiz!</h1>
      <p>Prepare-se para responder às perguntas e testar seus conhecimentos.</p>
      <button onClick={() => navigate(`/quiz/${sessionId}/0`)}>Iniciar Quiz</button>
    </div>
  );
};

export default Start;