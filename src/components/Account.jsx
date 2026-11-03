import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserData, returnBook } from "../api";

export default function Account({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      if (token) {
        const data = await fetchUserData(token);
        if (data) setUser(data);
      }
    }
    getUser();
  }, [token]);

  const handleReturn = async (reservationId) => {
    const res = await returnBook(reservationId, token);
    if (res && res.success) {
      // Filtrar la reserva devuelta de la lista local
      setUser({
        ...user,
        reservations: user.reservations.filter((r) => r.id !== reservationId),
      });
    }
  };

  if (!token) {
    return (
      <div>
        <h2>Acceso denegado</h2>
        <p>
          Por favor, <Link to="/login">inicia sesión</Link> o{" "}
          <Link to="/register">regístrate</Link> para ver tu cuenta.
        </p>
      </div>
    );
  }

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>
        <strong>Nombre:</strong> {user.firstname} {user.lastname}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <h3>Mis Libros Reservados</h3>
      {user.reservations && user.reservations.length > 0 ? (
        <ul>
          {user.reservations.map((res) => (
            <li key={res.id} style={{ marginBottom: "10px" }}>
              <strong>{res.title}</strong> por {res.author}{" "}
              <button onClick={() => handleReturn(res.id)}>
                Devolver Libro
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes libros reservados en este momento.</p>
      )}
    </div>
  );
}
