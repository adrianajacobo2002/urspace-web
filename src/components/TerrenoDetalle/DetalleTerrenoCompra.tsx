import React from "react";
import { Box, Typography } from "@mui/material";


interface DetalleTerrenoCompraProps {
  name: string;
  location: string;
  price: number;
  images: string[];
  rating: number;
  description: string;
  capacity: number;
  etiquetas: string[]; // Añadir etiquetas aquí
  usuario: {
    nombre: string;
    apellido: string;
    email: string;
  };
}

const DetalleTerrenoCompra: React.FC<DetalleTerrenoCompraProps> = ({
  name,
  location,
  price,
  images,
  rating,
  description,
  capacity,
  etiquetas,
}) => {
  return (
    <div>
      <h2>{name} - Venta</h2>
      <p>Ubicación: {location}</p>
      <p>Precio de la propiedad: ${price} USD</p>
      <p>Calificación: {rating}</p>
      <p>Descripción: {description}</p>
      <p>Capacidad: {capacity} personas</p>

      <h3>Imágenes</h3>
      <div>
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Imagen ${index + 1}`} style={{ width: "100px", marginRight: "5px" }} />
        ))}
      </div>
      <Typography variant="body2">Etiquetas: {etiquetas.join(", ")}</Typography>

    </div>
  );
};

export default DetalleTerrenoCompra;
