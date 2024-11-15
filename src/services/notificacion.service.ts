// src/services/notificaciones.service.ts
import axios from "axios";
import socket from "../socket";

const API_URL = "http://localhost:3000/api"; // Cambia la URL base según tu configuración

// Función para obtener el token almacenado en localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró un token");
  }
  return token;
};

// notificacion.service.ts
export const getNotificacionesByUsuario = async (userId: number) => {
    try {
      const response = await axios.get(`${API_URL}/notificaciones/usuario/${userId}`);
      console.log("Datos de notificaciones obtenidos de la API:", response.data); // Verificar la respuesta
      return response.data;
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
      throw error;
    }
  };
  
  

// Marcar una notificación como leída
export const markNotificacionAsRead = async (idNotificacion: number) => {
  try {
    const token = getToken();
    const response = await axios.patch(
      `${API_URL}/notificaciones/${idNotificacion}`,
      { leido: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al marcar la notificación como leída:", error);
    throw error;
  }
};

// Escuchar notificaciones en tiempo real
export const listenForRealTimeNotifications = (callback: (data: any) => void) => {
  socket.on("receiveNotification", callback);
};

// Unirse a la sala de notificaciones del usuario
export const joinUserNotificationRoom = (userId: number) => {
  socket.emit("joinUserRoom", userId);
};
