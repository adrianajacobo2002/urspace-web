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

interface CardUserProps {
  nombre: string; // Nombre del terreno
  estado: string; // Estado de la reserva (Pendiente, EnCurso, Completa, Cancelada)
  ubicacion: string; // Ubicación de la propiedad
  precio_total?: number | null; // Total de la reserva
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
  property,
  estado,
  ubicacion,
  precio_total,
  mostrarResena,
  onCancelReserva,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
