import React from "react";
import { Box, Typography, Card, Avatar, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ReservationCardProps {
  initials: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  property: string;
  usuarioDestinatarioId: number; // ID del usuario destinatario
  loggedInUserId: number; // ID del usuario logueado
  onMessageClick?: (conversationId: number, otherUserName: string, otherUserInitials: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  initials,
  name,
  dateStart,
  dateEnd,
  status,
  property,
  usuarioDestinatarioId,
  loggedInUserId,
  onMessageClick,
}) => {
  const navigate = useNavigate(); // Añadir useNavigate para la redirección
  const formattedStartDate = new Date(dateStart).toLocaleDateString("es-ES");
  const formattedEndDate = new Date(dateEnd).toLocaleDateString("es-ES");

  const handleSendMessage = async () => {
    try {
      // Solicitar la conversación o crear una nueva si no existe
      const response = await axios.post("http://localhost:3000/api/conversaciones/find-or-create", {
        usuario_remitente_id: loggedInUserId,
        usuario_destinatario_id: usuarioDestinatarioId,
      });
      
      const conversacion = response.data;
      console.log("Conversación encontrada o creada:", conversacion);

      // Redirigir a la página de chat con el ID de la conversación
      navigate(`/chat`);
    } catch (error) {
      console.error("Error al encontrar o crear conversación:", error);
    }
  };

  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, width: 400 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Avatar sx={{ bgcolor: "#65348c", color: "white" }}>{initials}</Avatar>
        <Typography sx={{ color: "black" }} variant="subtitle1">
          {name}
        </Typography>
      </Box>
      <Typography variant="body2">
        Fecha: {formattedStartDate} - {formattedEndDate}
      </Typography>
      <Typography variant="body2">Estado: {status}</Typography>
      <Typography variant="body2" mb={2}>
        Propiedad: {property}
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ backgroundColor: "#65348c", textTransform: "none" }}
        >
          Enviar Mensaje
        </Button>
      </Box>
    </Card>
  );
};

export default ReservationCard;
