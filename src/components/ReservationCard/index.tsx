import React from "react";
import { Box, Typography, Card, Avatar, Button } from "@mui/material";

interface ReservationCardProps {
  initials: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  property: string;
  onMessageClick?: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  initials,
  name,
  dateStart,
  dateEnd,
  status,
  property,
  onMessageClick,
}) => {
  const formattedStartDate = new Date(dateStart).toLocaleDateString("es-ES");
  const formattedEndDate = new Date(dateEnd).toLocaleDateString("es-ES");

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
          onClick={onMessageClick}
          sx={{ backgroundColor: "#65348c", textTransform: "none" }}
        >
          Enviar Mensaje
        </Button>
      </Box>
    </Card>
  );
};

export default ReservationCard;
