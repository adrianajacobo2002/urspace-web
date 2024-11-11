// src/components/MiniCardGroup.tsx

import React, { useState } from "react";
import { Box } from "@mui/material";
import MiniCard from "./MiniCard";

const MiniCardGroup: React.FC = () => {
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
        label="Alquiler"
        count={2}
        isActive={activeCard === "Alquiler"}
        onClick={() => handleCardClick("Alquiler")}
      />
      <MiniCard
        label="Venta"
        count={0}
        isActive={activeCard === "Venta"}
        onClick={() => handleCardClick("Venta")}
      />
    </Box>
  );
};

export default MiniCardGroup;
