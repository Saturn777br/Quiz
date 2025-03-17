import { useNavigate } from "react-router-dom";
import "../App.css"; // Importa os estilos

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Quiz!</h1>
      <p>Teste seus conhecimentos e desafie-se.</p>
      <button onClick={() => navigate("/login")}>Fazer Login</button>
      <button onClick={() => navigate("/register")}>Registrar</button>
    </div>
  );
};

export default Home;
