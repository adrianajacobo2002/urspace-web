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
      images:
        property.ImagenTerreno?.map(
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
        terreno.Valoracion?.reduce(
          (acc: number, val: any) => acc + val.puntuacion,
          0
        ) / (terreno.Valoracion?.length || 1),
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
    const response = await axios.get(
      `${API_URL}/excluir-usuario/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data) {
      console.error("No se recibieron terrenos del servidor.");
      return [];
    }

    // Log para verificar el contenido de ImagenTerreno
    console.log(
      "Datos de ImagenTerreno recibidos:",
      response.data.map((terreno: any) => terreno.ImagenTerreno)
    );

    // Mapear los datos a las propiedades necesarias
    const terrenosMapeados = response.data.map((terreno: any) => {
      const images = terreno.ImagenTerreno
        ? terreno.ImagenTerreno.map((img: any) => {
            const urlCompleta = `http://localhost:3000${img.url_imagen}`;
            console.log("URL completa generada para imagen:", urlCompleta);
            return urlCompleta;
          })
        : [];

      return {
        id: terreno.id_terreno,
        name: terreno.nombre,
        location: terreno.ubicacion,
        price: terreno.precio,
        type: terreno.tipo_terreno,
        rating:
          terreno.Valoracion?.reduce(
            (acc: number, val: any) => acc + val.calificacion,
            0
          ) / (terreno.Valoracion?.length || 1) || 0,
        images: images,
      };
    });
    // Log para verificar que el mapeo de las imágenes es correcto
    console.log("Terrenos mapeados:", terrenosMapeados);

    return terrenosMapeados;
  } catch (error) {
    console.error("Error al obtener terrenos excluyendo usuario:", error);
    return [];
  }
};

interface FilterTerrenosParams {
  country?: string;
  city?: string;
  etiquetas?: number[];
}

export const fetchFilteredTerrenos = async (
  country: string,
  city: string,
  etiquetas: number[]
) => {
  try {
    const filters: FilterTerrenosParams = {
      country: country || undefined,
      city: city || undefined,
      etiquetas: etiquetas.length > 0 ? etiquetas : undefined,
    };

    const response = await axios.post(`${API_URL}/filtrar`, filters);
    return response.data;
  } catch (error) {
    console.error("Error al filtrar terrenos:", error);
    throw error;
  }
};

export const getTerrenoById = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      console.error("No se recibió el terreno del servidor.");
      return null;
    }

    console.log("Datos del terreno recibidos:", response.data);

    const valoraciones =
      response.data.Valoracion?.map((valoracion: any) => ({
        usuario: {
          nombre: valoracion.Usuario.nombres,
          apellido: valoracion.Usuario.apellidos,
        },
        calificacion: valoracion.calificacion,
        comentario: valoracion.comentario,
        fecha: valoracion.fecha_valoracion.split("T")[0], // Formato YYYY-MM-DD
      })) || [];

    const promedioCalificacion =
      valoraciones.reduce(
        (acc: number, val: any) => acc + (val.calificacion || 0),
        0
      ) / (valoraciones.length || 1);

    // Realizamos un chequeo para verificar que la respuesta tiene los datos necesarios
    const terrenoData = {
      id: response.data.id_terreno,
      name: response.data.nombre || "Nombre no disponible",
      location: response.data.ubicacion || "Ubicación no disponible",
      price: response.data.precio || 0,
      type: response.data.tipo_terreno || "Desconocido",
      rating: promedioCalificacion,
      images: response.data.ImagenTerreno
        ? response.data.ImagenTerreno.map(
            (img: any) => `http://localhost:3000${img.url_imagen}`
          )
        : [],
      description: response.data.descripcion || "Descripción no disponible",
      capacity: response.data.capacidad || 0,
      reservations: response.data.Reservacion || [],
      etiquetas: response.data.etiquetas
        ? response.data.etiquetas.map(
            (etiqueta: any) => etiqueta || "Etiqueta desconocida"
          )
        : [],
      usuario: {
        nombre: response.data.Usuario.nombres,
        apellido: response.data.Usuario.apellidos,
        email: response.data.Usuario.email,
      },
      latitud: response.data.latitud,
      longitud: response.data.longitud,
      promedioCalificacion,
      totalResenas: valoraciones.length,
      resenas: valoraciones,
    };

    console.log("Datos del terreno mapeado:", terrenoData);

    return terrenoData;
  } catch (error) {
    console.error("Error al obtener detalle del terreno:", error);
    throw error;
  }
};

export const updateTerreno = async (
  id: number,
  terrenoData: {
    nombre: string;
    descripcion: string;
    tipo_terreno: string;
    capacidad: number;
    precio: number;
  }
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const response = await axios.patch(`${API_URL}/${id}`, terrenoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el terreno:", error);
    throw error;
  }
};

export const deleteTerreno = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el terreno:", error);
    throw error;
  }
};