// src/services/valoraciones.service.ts
import axios from "axios";
import { getUserInfo } from "./users.service"; // Importa el servicio para obtener el usuario logeado

const API_URL = "http://localhost:3000/api";

export interface ValoracionData {
    calificacion: number; 
    comentario?: string; 
    terreno_id: number; 
  }
  
  /**
   * Verifica el usuario logeado y crea una valoración.
   * @param data Los datos de la valoración
   * @returns La respuesta de la creación de la valoración
   */
  export const createValoracion = async (data: ValoracionData) => {
    try {
      // Obtener el token de autenticación
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuario no autenticado. Por favor, inicia sesión.");
      }
  
      // Obtener el usuario logeado para usar su ID
      const user = await getUserInfo();
      const id_usuario = user.id_usuario;
  
      // Verifica si se tiene el ID del usuario logeado
      if (!id_usuario) {
        throw new Error("No se pudo obtener el ID del usuario logeado.");
      }

      console.log("Datos de la valoración:", {
        ...data,
        usuario_id: id_usuario,
      });
  
      // Crear la valoración
      const response = await axios.post(
        `${API_URL}/valoraciones`,
        {
          ...data,
          usuario_id: id_usuario, // Agrega el ID del usuario logeado a los datos de la valoración
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta de la API al crear la valoración:", response.data);
      return response.data; // Retorna la respuesta de la API
    } catch (error) {
      console.error("Error al crear la valoración:", error);
      throw error;
    }
  };
