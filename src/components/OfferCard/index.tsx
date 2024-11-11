// src/components/OfferCard.tsx

import React from "react";
import { Box, Typography, Card, Avatar, Button } from "@mui/material";

interface OfferCardProps {
  initials: string;
  name: string;
  property: string;
  onMessageClick?: () => void;
  onRejectClick?: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({
  initials,
  name,
  property,
  onMessageClick,
  onRejectClick,
}) => {
  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, width: 250 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Avatar sx={{ bgcolor: "#65348c" }}>{initials}</Avatar>
        <Typography variant="subtitle1">{name}</Typography>
      </Box>
      <Typography variant="body2" mb={2}>Propiedad: {property}</Typography>
      <Box display="flex" gap={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={onMessageClick}
          sx={{ backgroundColor: "#65348c", textTransform: "none", width: "50%" }}
        >
          Enviar Mensaje
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onRejectClick}
          sx={{ backgroundColor: "#65348c", textTransform: "none", width: "50%" }}
        >
          Rechazar
        </Button>
      </Box>
    </Card>
  );
};

export default OfferCard;
