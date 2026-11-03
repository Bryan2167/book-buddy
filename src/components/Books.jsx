import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllBooks } from "../api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadBooks() {
      const booksData = await fetchAllBooks();
      if (booksData) setBooks(booksData);
    }
    loadBooks();
  }, []);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2>Catálogo de Libros</h2>
      <input
        type="text"
        placeholder="Buscar libro por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={book.coverimage}
              alt={book.title}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <h3>{book.title}</h3>
            <p>
              <strong>Autor:</strong> {book.author}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {book.available ? "Disponible" : "No disponible"}
            </p>
            <Link to={`/books/${book.id}`}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
