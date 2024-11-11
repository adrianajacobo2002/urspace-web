import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchEtiquetas = async () => {
  try {
    const response = await axios.get(`${API_URL}/etiquetas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las etiquetas:", error);
    throw error;
  }
};
