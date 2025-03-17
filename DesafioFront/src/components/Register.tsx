import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api";
import "../App.css"; // 

const Register = () => {
  const [user, setUser] = useState({ cpf: "", name: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    await createUser(user);
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <p>Crie sua conta para começar o quiz</p>

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
      <button onClick={handleRegister}>Registrar</button>

    </div>
  );
};

export default Register;
