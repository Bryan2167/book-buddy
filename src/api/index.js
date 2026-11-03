const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

// 1. REGISTRO DE USUARIO
// POST /users/register
export const registerUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const result = await response.json();
    return result; // Retorna { message, token, user } o error
  } catch (error) {
    console.error("Error en registerUser:", error);
  }
};

// 2. INICIO DE SESIÓN (LOGIN)
// POST /users/login
export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    return result; // Retorna { message, token } o error
  } catch (error) {
    console.error("Error en loginUser:", error);
  }
};

// 3. OBTENER PERFIL DE USUARIO
// GET /users/me
export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result; // Retorna { firstname, lastname, email, id, reservations }
  } catch (error) {
    console.error("Error en fetchUserData:", error);
  }
};

// 4. OBTENER TODOS LOS LIBROS
// GET /books
export const fetchAllBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    // La API responde directamente con un Array o un objeto wrapping el array
    return Array.isArray(result) ? result : result.books;
  } catch (error) {
    console.error("Error en fetchAllBooks:", error);
  }
};

// 5. OBTENER UN LIBRO POR ID
// GET /books/{id}
export const fetchSingleBook = async (bookId) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result; // Retorna el objeto del libro { id, title, author, description, coverimage, available }
  } catch (error) {
    console.error("Error en fetchSingleBook:", error);
  }
};

// 6. RESERVAR UN LIBRO
// POST /reservations
export const reserveBook = async (bookId, token) => {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId }),
    });
    const result = await response.json();
    return result; // Retorna { id, bookid, userid }
  } catch (error) {
    console.error("Error en reserveBook:", error);
  }
};

// 7. OBTENER LAS RESERVAS DEL USUARIO
// GET /reservations
export const fetchReservations = async (token) => {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result; // Retorna lista de reservas del usuario
  } catch (error) {
    console.error("Error en fetchReservations:", error);
  }
};

// 8. DEVOLVER UN LIBRO (ELIMINAR RESERVA)
// DELETE /reservations/{id}
export const returnBook = async (reservationId, token) => {
  try {
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // La respuesta 204 No Content no retorna cuerpo JSON
    if (response.status === 204) {
      return { success: true };
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en returnBook:", error);
  }
};
