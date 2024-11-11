import React from "react";
import { Box } from "@mui/material";
import MiniCard from "./MiniCard";

interface MiniCardReservationProps {
  onFilterChange: (status: string) => void;
  activeFilter: string;
  reservationCounts: {
    Todas: number;
    Pendiente: number;
    EnCurso: number;
  };
}

const MiniCardReservation: React.FC<MiniCardReservationProps> = ({
  onFilterChange,
  activeFilter,
  reservationCounts,
}) => {
  const handleCardClick = (label: string) => {
    onFilterChange(label);
  };

  return (
    <Box display="flex" gap={2}>
      {["Todas", "Pendiente", "EnCurso"].map((label) => (
        <MiniCard
          key={label}
          label={label === "EnCurso" ? "En Curso" : label}
          count={reservationCounts[label as keyof typeof reservationCounts]}
          isActive={activeFilter === label}
          onClick={() => handleCardClick(label)}
        />
      ))}
    </Box>
  );
};

export default MiniCardReservation;
