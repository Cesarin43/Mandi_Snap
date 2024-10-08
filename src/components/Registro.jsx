import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"; 
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const Registro = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [rol, setRol] = useState("");
  const [recuperacionEmail, setRecuperacionEmail] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado correctamente");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegresar = () => {
    navigate("/");
  };

  return (
    <div className="register">
      <header className="header-principal">
        <h1 className="logo-title">MANDI SNAP</h1>
      </header>
      <div className="register-container">
        <form onSubmit={handleRegistro} className="register-form">
          <h2>Registro de usuario</h2>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              name="usuario"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Repetir Contraseña</label>
            <input
              type="password"
              name="repetirContraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Correo de Recuperación</label>
            <input
              type="email"
              name="correoRecuperacion"
              value={recuperacionEmail}
              onChange={(e) => setRecuperacionEmail(e.target.value)}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* Muestra el error si existe */}
          <button type="submit" className="btn">
            Registrarse
          </button>
          <button onClick={handleRegresar} className="btn-regresar">
            Inicio
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;