// src/components/ResumenDatos.tsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";

interface Etiqueta {
  id: number;
  nombre: string;
}

interface ResumenDatosProps {
  formData: {
    tipoPropiedad: string;
    informacionPropiedad: {
      nombre: string;
      descripcion: string;
      capacidad: number;
      precio: number;
      etiquetas: Etiqueta[] | number[];
      imagenes: File[];
    };
    ubicacionPropiedad: {
      pais: string;
      ciudad: string;
      latitud: number | null;
      longitud: number | null;
    };
  };
}

const ResumenDatos: React.FC<ResumenDatosProps> = ({ formData }) => (
  <Box sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
    <Typography variant="h6">Resumen de la Propiedad</Typography>
    <Typography>Tipo de Propiedad: {formData.tipoPropiedad}</Typography>
    <Typography>Nombre: {formData.informacionPropiedad.nombre}</Typography>
    <Typography>Descripción: {formData.informacionPropiedad.descripcion}</Typography>
    <Typography>Capacidad: {formData.informacionPropiedad.capacidad}</Typography>
    <Typography>Precio: {formData.informacionPropiedad.precio}</Typography>
    <Typography>Ubicación: {formData.ubicacionPropiedad.pais}, {formData.ubicacionPropiedad.ciudad}</Typography>
    <Typography>Latitud: {formData.ubicacionPropiedad.latitud}</Typography>
    <Typography>Longitud: {formData.ubicacionPropiedad.longitud}</Typography>

    <Typography variant="subtitle1" sx={{ mt: 2 }}>Etiquetas:</Typography>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {formData.informacionPropiedad.etiquetas.map((etiqueta, index) => (
        <Chip
          key={index}
          label={typeof etiqueta === "object" ? etiqueta.nombre : `Etiqueta ${etiqueta}`}
          sx={{ backgroundColor: "#F0E8FF", color: "#65348c", border: "1px solid #65348c" }}
        />
      ))}
    </Box>

    <Typography variant="body1" sx={{ mt: 2 }}>
      <strong>IDs de etiquetas:</strong> {formData.informacionPropiedad.etiquetas
        .map((etiqueta) => typeof etiqueta === "object" ? etiqueta.id : etiqueta)
        .join(", ")}
    </Typography>

    <Typography variant="subtitle1" sx={{ mt: 2 }}>Imágenes:</Typography>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {formData.informacionPropiedad.imagenes.map((imagen, index) => (
        <Box key={index} sx={{ position: "relative" }}>
          <img src={URL.createObjectURL(imagen)} alt={`Imagen ${index}`} style={{ width: 100, height: 100, borderRadius: 8 }} />
        </Box>
      ))}
    </Box>
  </Box>
);

export default ResumenDatos;
