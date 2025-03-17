import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "../App.css"; // Importa os estilos globais

const Login = () => {
  const [user, setUser] = useState({ cpf: "", name: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Limpa erros anteriores
    try {
      const response = await loginUser(user);
      console.log("🛠️ Resposta da API:", response);

      if (response.user_id) {
        navigate(`/start/${response.user_id}`); // Corrigido (faltavam aspas)
      } else {
        setError("CPF não encontrado. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Verifique o CPF.");
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p>Digite seu CPF para continuar</p>

      <input
        type="text"
        placeholder="Nome"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="input-field"
      />
      <input
        type="text"
        placeholder="CPF"
        value={user.cpf}
        onChange={(e) => setUser({ ...user, cpf: e.target.value })}
        className="input-field"
      />
      <button onClick={handleLogin}>Login</button>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Login;