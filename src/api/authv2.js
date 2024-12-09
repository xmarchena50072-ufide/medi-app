const API_URL = "http://localhost:4000/api/auth";

// Función para registrar un usuario
export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar");
  }

  return response.json(); // Devuelve los datos del usuario y el token
};

// Función para iniciar sesión
export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return response.json(); // Devuelve los datos del usuario y el token
};

// Función para obtener información del usuario autenticado
export const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    console.log("Token en localStorage:", token); // Verifica si el token se obtiene correctamente

    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }
  
    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregamos el prefijo Bearer
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener información del usuario");
    }
  
    return response.json(); // Devuelve los datos del usuario
  };
