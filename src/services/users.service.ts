import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Asegúrate de que la URL esté configurada correctamente

// Servicio de inicio de sesión
export const login = async (email: string, password: string) => {
  try {
    console.log("Sending login request to API", { email, password }); // Log para verificar los datos que se envían
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("Login response received:", response.data); // Log para ver la respuesta del servidor
    return response.data;
  } catch (error: unknown) { // Cambia `any` a `unknown`
    if (axios.isAxiosError(error)) {
      console.error("Error in login service:", error); // Log para ver cualquier error de Axios
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
    } else {
      console.error("Non-Axios error in login service:", error); // Log para errores no relacionados con Axios
      throw new Error('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  }
};
