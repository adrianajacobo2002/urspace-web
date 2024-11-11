// src/components/ReservationCard.tsx

import React from "react";
import { Box, Typography, Card, Avatar, Button } from "@mui/material";

interface ReservationCardProps {
  initials: string;
  name: string;
  date: string;
  status: string;
  property: string;
  onMessageClick?: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  initials,
  name,
  date,
  status,
  property,
  onMessageClick,
}) => {
  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, width: 250 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Avatar sx={{ bgcolor: "#65348c" }}>{initials}</Avatar>
        <Typography variant="subtitle1">{name}</Typography>
      </Box>
      <Typography variant="body2">Fecha: {date}</Typography>
      <Typography variant="body2">Estado: {status}</Typography>
      <Typography variant="body2" mb={2}>Propiedad: {property}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onMessageClick}
        sx={{ backgroundColor: "#65348c", textTransform: "none" }}
      >
        Enviar Mensaje
      </Button>
    </Card>
  );
};

export default ReservationCard;
