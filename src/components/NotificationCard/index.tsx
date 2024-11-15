// src/components/NotificationCard.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface NotificationCardProps {
  mensaje: string;
  leido: boolean;
  onMarkAsRead: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ mensaje, leido, onMarkAsRead }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: leido ? "#e0e0e0" : "#D6A8E7",
        padding: 2,
        borderRadius: 2,
        marginBottom: 2,
      }}
    >
      <CheckCircleIcon sx={{ color: "#4CAF50", marginRight: 2 }} />
      <Typography sx={{ flex: 1, color: "#fff" }}>{mensaje}</Typography>
      {!leido && (
        <Button variant="text" onClick={onMarkAsRead} sx={{ color: "#fff" }}>
          Marcar como leída
        </Button>
      )}
    </Box>
  );
};

export default NotificationCard;
