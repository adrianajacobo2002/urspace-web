import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { getTerrenoById } from "../../services/terrenos.service";
import DetalleTerrenoAlquiler from "./DetalleTerrenoAlquiler";
import DetalleTerrenoCompra from "./DetalleTerrenoCompra";

interface ResenaProps {
  usuario: {
    nombre: string;
    apellido: string;
  };
  calificacion: number;
  comentario: string;
  fecha: string;
}

interface TerrenoDetalleProps {
  id: number;
  name: string;
  location: string;
  price: number;
  type: string;
  rating: number;
  images: string[];
  description: string;
  capacity: number;
  reservations?: any[];
  latitud: number;
  longitud: number;
  etiquetas: string[];
  usuario: {
    nombre: string;
    apellido: string;
    email: string;
  };
  promedioCalificacion: number;
  totalResenas: number;
  resenas: ResenaProps[];
}

const TerrenoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const [terreno, setTerreno] = useState<TerrenoDetalleProps | null>(null);

  useEffect(() => {
    const fetchTerreno = async () => {
      if (id) {
        const terrenoData = await getTerrenoById(Number(id));
        console.log("Datos del terreno obtenidos:", terrenoData);
        setTerreno(terrenoData);
      }
    };
    fetchTerreno();
  }, [id]);

  if (!terreno) return <div>Loading...</div>;

  return (
    <div>
      {terreno.type === "Alquiler" ? (
        <DetalleTerrenoAlquiler
          id={terreno.id}
          name={terreno.name}
          location={terreno.location}
          price={terreno.price}
          images={terreno.images}
          rating={terreno.promedioCalificacion}
          description={terreno.description}
          capacity={terreno.capacity}
          reservations={terreno.reservations || []}
          latitud={terreno.latitud}
          longitud={terreno.longitud}
          etiquetas={terreno.etiquetas} 
          usuario={terreno.usuario} 
          totalResenas={terreno.totalResenas}
          resenas={terreno.resenas}

        />
      ) : (
        <DetalleTerrenoCompra
          name={terreno.name}
          location={terreno.location}
          price={terreno.price}
          images={terreno.images}
          rating={terreno.rating}
          description={terreno.description}
          capacity={terreno.capacity}
          etiquetas={terreno.etiquetas} // Pasar las etiquetas al componente
          usuario={terreno.usuario} // Pasar el usuario al componente
        />
      )}
    </div>
  );
};

export default TerrenoDetalle;
