import { useNavigate } from "react-router-dom";
import "../App.css"; // Importa os estilos

const Finish = () => {
  const navigate = useNavigate();

  return (
    <div className="finish-container">
      <h1>Parabéns! 🎉</h1>
      <p>Você concluiu o quiz.</p>
      <button onClick={() => navigate("/")}>Voltar para o início</button>
    </div>
  );
};

export default Finish;
