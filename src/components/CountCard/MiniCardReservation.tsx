// src/components/MiniCardGroup.tsx

import React, { useState } from "react";
import { Box } from "@mui/material";
import MiniCard from "./MiniCard";

const MiniCardReservation: React.FC = () => {
  const [activeCard, setActiveCard] = useState("Todas");

  const handleCardClick = (label: string) => {
    setActiveCard(label);
    // Aquí puedes agregar la lógica para filtrar las propiedades según el label
  };

  return (
    <Box display="flex" gap={2}>
      <MiniCard
        label="Todas"
        count={2}
        isActive={activeCard === "Todas"}
        onClick={() => handleCardClick("Todas")}
      />
      <MiniCard
        label="Pendiente"
        count={2}
        isActive={activeCard === "Pendiente"}
        onClick={() => handleCardClick("Pendiente")}
      />
      <MiniCard
        label="En Curso"
        count={0}
        isActive={activeCard === "En Curso"}
        onClick={() => handleCardClick("En Curso")}
      />
    </Box>
  );
};

export default MiniCardReservation;
