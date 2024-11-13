import axios from "axios";
import { getUserInfo } from "./users.service";

const API_URL = "http://localhost:3000/api/terrenos";

export const createTerreno = async (terrenoData: {
  nombre: string;
  ubicacion: string;
  latitud?: number;
  longitud?: number;
  capacidad: number;
  precio: number;
  tipo_terreno: string;
  descripcion?: string;
  imagenes?: File[];
  etiquetas?: number[];
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  // Llamar a getUserInfo para obtener el usuario_id
  const userInfo = await getUserInfo();
  const usuario_id = userInfo.id_usuario; // Aquí extraemos el usuario_id

  const formData = new FormData();
  formData.append("nombre", terrenoData.nombre);
  formData.append("ubicacion", terrenoData.ubicacion);
  formData.append("latitud", String(terrenoData.latitud || ""));
  formData.append("longitud", String(terrenoData.longitud || ""));
  formData.append("capacidad", String(terrenoData.capacidad));
  formData.append("precio", String(terrenoData.precio));
  formData.append("tipo_terreno", terrenoData.tipo_terreno);
  formData.append("descripcion", terrenoData.descripcion || "");
  formData.append("usuario_id", String(usuario_id)); // Envía el usuario_id desde el frontend

  // Agregar cada etiqueta como un campo separado en FormData
  terrenoData.etiquetas?.forEach((etiquetaId) => {
    formData.append("etiquetas", String(etiquetaId));
  });

  // Agregar archivos de imágenes
  terrenoData.imagenes?.forEach((imagen) => {
    formData.append("imagenes", imagen);
  });

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getPropertiesByCurrentUser = async () => {
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
      console.error("No se recibieron propiedades del servidor.");
      return [];
    }

    return response.data.map((property: any) => ({
      id: property.id_terreno,
      images: property.ImagenTerreno?.map(
        (image: any) => `http://localhost:3000${image.url_imagen}`
      ) || [],
      title: property.nombre,
      property: property.ubicacion,
      price: `$${property.precio} USD`,
      type: property.tipo_terreno,
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

export const getAllTerrenos = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      console.error("No se recibieron terrenos del servidor.");
      return [];
    }

    return response.data.map((terreno: any) => ({
      id: terreno.id_terreno,
      images:
        terreno.ImagenTerreno?.map(
          (image: any) => `http://localhost:3000${image.url_imagen}`
        ) || [],
      name: terreno.nombre,
      location: terreno.ubicacion,
      price: terreno.precio,
      type: terreno.tipo_terreno === "Venta" ? "Venta" : "Alquiler", // Mapeo según el enum
      rating:
        terreno.Valoracion?.reduce((acc: number, val: any) => acc + val.puntuacion, 0) /
        (terreno.Valoracion?.length || 1),
    }));
  } catch (error) {
    console.error("Error fetching terrenos:", error);
    return [];
  }
};


export const getTerrenosExcluyendoUsuario = async (usuarioId: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const response = await axios.get(`${API_URL}/excluir-usuario/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      console.error("No se recibieron terrenos del servidor.");
      return [];
    }

    // Mapear los datos para adecuarlos al formato esperado en tu aplicación, si es necesario.
    return response.data.map((terreno: any) => ({
      id: terreno.id_terreno,
      name: terreno.nombre,
      location: terreno.ubicacion,
      price: terreno.precio,
      type: terreno.tipo_terreno,
      rating: terreno.Valoracion?.reduce((acc: number, val: any) => acc + val.calificacion, 0) / (terreno.Valoracion?.length || 1) || 0,
      images: terreno.ImagenTerreno?.map((img: any) => `http://localhost:3000${img.url_imagen}`) || [],
    }));
  } catch (error) {
    console.error("Error al obtener terrenos excluyendo usuario:", error);
    return [];
  }
};
