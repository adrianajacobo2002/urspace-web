import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Función para obtener el token almacenado en localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró un token");
  }
  return token;
};

// Servicio para obtener información del usuario logueado
export const getUserInfo = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Debería incluir el `id_usuario`
  } catch (error) {
    console.error("Error obteniendo información del usuario:", error);
    throw error;
  }
};

// Servicio para obtener conversaciones de un usuario logueado
export const getConversacionesByUsuario = async () => {
  try {
    const userInfo = await getUserInfo();
    const id_usuario = userInfo.id_usuario;

    const token = getToken();
    const response = await axios.get(`${API_URL}/conversaciones/usuario/${id_usuario}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getConversacionesByUsuario:", error);
    return [];
  }
};

// Servicio para obtener detalles de una conversación específica
export const getConversationDetails = async (conversationId: number) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/conversaciones/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getConversationDetails:", error);
    throw error;
  }
};

interface Conversation {
  id_conversacion: number;
  usuario_remitente_id: number;
  usuario_destinatario_id: number;
  fecha_inicio: string;
}

// Servicio para encontrar o crear una conversación
export const findOrCreateConversation = async (
  userId: number,
  usuarioDestinatarioId: number
): Promise<Conversation> => {
  const token = getToken();
  const response = await axios.post<Conversation>(
    `${API_URL}/conversaciones/find-or-create`,
    {
      usuario_remitente_id: userId,
      usuario_destinatario_id: usuarioDestinatarioId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
