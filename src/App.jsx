import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// Importa tus componentes/páginas (los crearemos a continuación)
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Guardar o eliminar el token de localStorage según cambie el estado
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="app-container">
      {/* Barra de navegación */}
      <nav
        style={{
          display: "flex",
          gap: "15px",
          padding: "10px",
          background: "#f0f0f0",
        }}
      >
        <Link to="/">Libros</Link>
        {token ? (
          <>
            <Link to="/account">Mi Cuenta</Link>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </nav>

      {/* Definición de Rutas */}
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books/:id" element={<SingleBook token={token} />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
        </Routes>
      </main>
    </div>
  );
}
