import axios from 'axios';
import { getUserInfo } from './users.service';

const API_URL = 'http://localhost:3000/api/ofertas';

export const createOffer = async (offerData: {
  fecha_oferta: string;
  terreno_id: number;
}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Usuario no autenticado');
  }

  const userInfo = await getUserInfo();
  const usuario_id = userInfo.id_usuario;

  const response = await axios.post(API_URL, {
    ...offerData,
    usuario_id, // Asigna el ID del usuario autenticado
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteOffer = async (id_oferta: number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Usuario no autenticado');
  }

  const response = await axios.delete(`${API_URL}/${id_oferta}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOffersByCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Usuario no autenticado");
    }
  
    try {
      const userInfo = await getUserInfo();
      const usuario_id = userInfo.id_usuario;
  
      const response = await axios.get(`${API_URL}/usuario/${usuario_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.data) {
        console.error("No se recibieron ofertas del servidor.");
        return [];
      }
  
      return response.data.map((offer: any) => {
        const nombre = offer.Usuario?.nombres || "N/A";
        const apellido = offer.Usuario?.apellidos || "";
        const initials = `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  
        return {
          id_oferta: offer.id_oferta,  // Incluye id_oferta aquí
          initials: initials,
          name: `${nombre} ${apellido.charAt(0)}.`,
          property: `${offer.Terreno.nombre}, ${offer.Terreno.ubicacion}`,
          onMessageClick: () => console.log(`Enviar mensaje a ${nombre}`),
          onRejectClick: () => console.log(`Rechazar oferta de ${nombre}`),
        };
      });
    } catch (error) {
      console.error("Error fetching offers:", error);
      return [];
    }
  };
  

  
  