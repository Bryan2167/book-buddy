import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleBook, reserveBook } from "../api";

export default function SingleBook({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadBook() {
      const data = await fetchSingleBook(id);
      if (data) setBook(data);
    }
    loadBook();
  }, [id]);

  const handleReserve = async () => {
    if (!token) return;
    const result = await reserveBook(book.id, token);
    if (result && result.id) {
      setMessage("¡Libro reservado con éxito!");
      setBook({ ...book, available: false });
    } else {
      setMessage("No se pudo reservar el libro.");
    }
  };

  if (!book) return <p>Cargando libro...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.coverimage} alt={book.title} style={{ width: "200px" }} />
      <p>
        <strong>Autor:</strong> {book.author}
      </p>
      <p>{book.description}</p>
      <p>
        <strong>Estado:</strong> {book.available ? "Disponible" : "Reservado"}
      </p>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {token ? (
        <button onClick={handleReserve} disabled={!book.available}>
          {book.available ? "Reservar Libro" : "No Disponible"}
        </button>
      ) : (
        <p>
          <em>Debes iniciar sesión para reservar este libro.</em>
        </p>
      )}
      <br />
      <br />
      <button onClick={() => navigate("/")}>Volver al catálogo</button>
    </div>
  );
}
