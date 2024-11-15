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
    return response.data;
  } catch (error) {
    console.error("Error obteniendo información del usuario:", error);
    throw error;
  }
};

// Servicio para obtener todas las reservas del usuario logueado
export const getAllReservasByCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró un token");
    }

    // Obtener id del usuario actual
    const userResponse = await getUserInfo();
    const id_usuario = userResponse.id_usuario;

    // Obtener reservas del usuario
    const reservasResponse = await axios.get(
      `${API_URL}/reservas/usuario/${id_usuario}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const mappedReservas = reservasResponse.data.map((reserva: any) => ({
      id_reservacion: reserva.id_reservacion,
      property: reserva.Terreno?.nombre || "Propiedad no disponible",
      ubicacion: reserva.Terreno?.ubicacion || "Ubicación no disponible",
      estado: reserva.estado || "Sin estado",
      precio_total: reserva.precio_total ?? null, // Usa null si no está definido
    }));

    return mappedReservas;
  } catch (error) {
    console.error("Error obteniendo todas las reservaciones:", error);
    throw error;
  }
};

// Servicio para obtener reservas del usuario actualmente logueado
export const getReservasByCurrentUser = async () => {
    try {
      const token = getToken();
  
      const userInfo = await getUserInfo();
      const id_usuario = userInfo.id_usuario;
  
      const reservasResponse = await axios.get(
        `${API_URL}/reservas/usuario/${id_usuario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Filtrar y mapear las reservas para incluir el nombre de la propiedad y del usuario
      const mappedReservas = reservasResponse.data
        .filter(
          (reserva: any) =>
            reserva.estado === "Pendiente" || reserva.estado === "EnCurso"
        )
        .map((reserva: any) => ({
          ...reserva,
          property: reserva.Terreno?.nombre || "Propiedad no disponible",
          userName: `${reserva.Usuario?.nombres} ${reserva.Usuario?.apellidos}` || "Usuario no disponible",
        }));
  
      return mappedReservas;
    } catch (error) {
      console.error("Error obteniendo las reservaciones:", error);
      throw error;
    }
  };  

// Servicio para obtener el conteo de reservas por estado (Pendiente, En Curso, etc.)
export const getReservasCountByEstado = async (estado: string) => {
  try {
    const token = getToken();

    const userInfo = await getUserInfo();
    const id_usuario = userInfo.id_usuario;

    const response = await axios.get(`${API_URL}/reservas/usuario/${id_usuario}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const reservas = response.data;
    const filteredReservas = reservas.filter(
      (reserva: any) => reserva.estado === estado
    );

    return filteredReservas.length;
  } catch (error) {
    console.error("Error obteniendo conteo de reservaciones por estado:", error);
    throw error;
  }
};


export const cancelarReserva = async (id_reservacion: number) => {
  try {
    const token = getToken();

    const response = await axios.patch(
      `${API_URL}/reservas/cancelar/${id_reservacion}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al cancelar la reserva:", error);
    throw error;
  }
};