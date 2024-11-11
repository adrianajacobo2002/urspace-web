import React from "react";
import { Box, Typography } from "@mui/material";

interface MiniCardProps {
  label: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

const MiniCard: React.FC<MiniCardProps> = ({ label, count, isActive, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        border: "1px solid",
        borderColor: isActive ? "#65348c" : "#CCCCCC", // Morado si está activo, gris si no
        borderRadius: "8px", // Borde suave para parecer una mini tarjeta
        backgroundColor: isActive ? "#F3E5F5" : "#FFFFFF", // Fondo morado claro si está activo
        color: isActive ? "#65348c" : "#000000",
        fontSize: "0.875rem",
        fontWeight: "bold",
        textTransform: "none",
        cursor: "pointer", // Indica que es clicable
        "&:hover": {
          backgroundColor: isActive ? "#EDE7F6" : "#F0F0F0",
        },
        minWidth: "80px", // Ancho mínimo para consistencia
        textAlign: "center",
        boxShadow: isActive ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <Typography variant="body2">
        {label} ({count})
      </Typography>
    </Box>
  );
};

export default MiniCard;
