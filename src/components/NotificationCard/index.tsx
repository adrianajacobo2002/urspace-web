// src/components/NotificationCard.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface NotificationCardProps {
  mensaje: string;
  leido: boolean;
  onMarkAsRead: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  mensaje,
  leido,
  onMarkAsRead,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: leido ? "#a982c8" : "#D6A8E7",
        padding: 2,
        borderRadius: 2,
        marginBottom: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "700px",
        width: "100%",
      }}
    >
      <CheckCircleIcon sx={{ color: "#47077f", marginRight: 2 }} />
      <Typography sx={{ flex: 1, color: "#fff", fontWeight: "bold" }}>{mensaje}</Typography>
      {!leido && (
        <Button variant="text" onClick={onMarkAsRead} sx={{ color: "#fff", fontWeight: "bold" }}>
          Marcar como leída
        </Button>
      )}
    </Box>
  );
};

export default NotificationCard;
