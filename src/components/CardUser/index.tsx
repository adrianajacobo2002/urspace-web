// src/components/CardUser/index.tsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ModalUser from "../ModalUser/modal";
import CancelIcon from "@mui/icons-material/Cancel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { jsPDF } from 'jspdf';


interface CardUserProps {
  id_reservacion: number;
  property: string; // Nombre del terreno
  estado: string; // Estado de la reserva (Pendiente, EnCurso, Completa, Cancelada)
  ubicacion: string; // Ubicación de la propiedad
  precio_total?: number | null; // Total de la reserva
  fecha_inicio: string;
  fecha_fin: string;
  impuestos: number;
  subtotal: number;
  capacidad: number;
  precio_noche: number;
  descripcion: string;
  propietario_nombre: string;
  propietario_correo: string;
  mostrarResena: boolean; // Indica si se debe mostrar el botón de reseña
  
  onCancelReserva?: () => void; // Función para cancelar reserva
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Pendiente":
      return "#A9A9A9"; // Gris
    case "EnCurso":
      return "#FFA500"; // Amarillo
    case "Cancelada":
      return "#FF0000"; // Rojo
    case "Completada":
      return "#32a852"; // Verde
    default:
      return "#000000"; // Negro como predeterminado
  }
};

const CardUser: React.FC<CardUserProps> = ({
  id_reservacion,
  property,
  estado,
  ubicacion,
  precio_total,
  fecha_inicio,
  fecha_fin,
  impuestos,
  subtotal,
  capacidad,
  precio_noche,
  descripcion,
  propietario_nombre,
  propietario_correo,
  mostrarResena,
  onCancelReserva,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(`Detalles de la Reserva #${id_reservacion}`, 20, 20);

    // Información de la reserva
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Información de la Reserva", 20, 30);
    doc.line(20, 32, 190, 32); // Línea de separación
    doc.text(`Propiedad: ${property}`, 20, 40);
    doc.text(`Ubicación: ${ubicacion}`, 20, 50);
    doc.text(`Estado: ${estado}`, 20, 60);
    doc.text(`Fecha de Inicio: ${fecha_inicio}`, 20, 70);
    doc.text(`Fecha de Fin: ${fecha_fin}`, 20, 80);
    doc.text(`Precio Total: $${precio_total?.toFixed(2) ?? "N/A"}`, 20, 90);
    doc.text(`Impuestos: $${impuestos.toFixed(2)}`, 20, 100);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, 110);

    // Información del Terreno
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Información del Terreno", 20, 120);
    doc.line(20, 122, 190, 122); // Línea de separación
    doc.text(`Capacidad: ${capacidad} personas`, 20, 130);
    doc.text(`Precio por Noche: $${precio_noche.toFixed(2)}`, 20, 140);
    doc.text(`Descripción: ${descripcion}`, 20, 150, { maxWidth: 170 }); // Descripción con ajuste de ancho

    // Información del Propietario
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Información del Propietario", 20, 160);
    doc.line(20, 162, 190, 162); // Línea de separación
    doc.text(`Nombre: ${propietario_nombre}`, 20, 170);
    doc.text(`Correo: ${propietario_correo}`, 20, 180);

    // Guardar el PDF
    doc.save(`Reserva_${id_reservacion}.pdf`);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 300,
          borderRadius: 3,
          padding: 2,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          border: "2px solid #e6e0f8",
          justifyContent: "center",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {property}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Estado:{" "}
            <span style={{ color: getEstadoColor(estado) }}>{estado}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {ubicacion}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: 1 }}>
            Total: $
            {precio_total !== null && precio_total !== undefined
              ? precio_total.toFixed(2)
              : "N/A"}
          </Typography>
          <IconButton
            aria-label="PDF"
            onClick={handleGeneratePDF}
            sx={{
              color: "#4f3c75",
              marginTop: 1,
            }}
          >
            <PictureAsPdfIcon fontSize="large" />
          </IconButton>

          {/* Botón para cancelar reserva (solo para estado Pendiente) */}
          {estado === "Pendiente" && (
            <Button
              variant="contained"
              size="small"
              onClick={onCancelReserva} // Llama a la función de cancelar reserva
              startIcon={<CancelIcon />}
              sx={{
                marginTop: 2,
                backgroundColor: "#FF0000",
                color: "white",
                "&:hover": { backgroundColor: "#cc0000" },
                borderRadius: 2,
                width: "100%",
              }}
            >
              Cancelar Reserva
            </Button>
          )}

          {mostrarResena && (
            <Button
              variant="contained"
              size="small"
              onClick={handleOpenModal}
              sx={{
                marginTop: 2,
                backgroundColor: "#4f3c75",
                color: "white",
                "&:hover": { backgroundColor: "#3b2c57" },
                borderRadius: 2,
                width: "100%",
              }}
            >
              Escribir reseña
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Modal de reseña */}
      <ModalUser open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default CardUser;
