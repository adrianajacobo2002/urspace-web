// src/components/AvatarWithInitials.tsx
import React from "react";
import { Avatar } from "@mui/material";

interface AvatarWithInitialsProps {
  firstName: string;
  lastName: string;
  hasMenu?: boolean; // para controlar si muestra el menú desplegable o no
}

const AvatarWithInitials: React.FC<AvatarWithInitialsProps> = ({ firstName, lastName, hasMenu = false }) => {
  // Genera las iniciales tomando la primera letra del nombre y del apellido
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <Avatar sx={{ bgcolor: "#65348c", cursor: hasMenu ? "pointer" : "default", color: 'white' }}>
      {initials}
    </Avatar>
  );
};

export default AvatarWithInitials;
