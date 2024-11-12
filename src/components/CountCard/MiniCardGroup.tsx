import React, { useState } from "react";
import { Box } from "@mui/material";
import MiniCard from "./MiniCard";

interface MiniCardGroupProps {
  onFilterChange: (type: string) => void;
  activeFilter: string;
  propertyCounts: {
    Todas: number;
    Alquiler: number;
    Venta: number;
  };
}

const MiniCardGroup: React.FC<MiniCardGroupProps> = ({ onFilterChange, activeFilter, propertyCounts }) => {
  return (
    <Box display="flex" gap={2}>
      <MiniCard
        label="Todas"
        count={propertyCounts.Todas}
        isActive={activeFilter === "Todas"}
        onClick={() => onFilterChange("Todas")}
      />
      <MiniCard
        label="Alquiler"
        count={propertyCounts.Alquiler}
        isActive={activeFilter === "Alquiler"}
        onClick={() => onFilterChange("Alquiler")}
      />
      <MiniCard
        label="Venta"
        count={propertyCounts.Venta}
        isActive={activeFilter === "Venta"}
        onClick={() => onFilterChange("Venta")}
      />
    </Box>
  );
};

export default MiniCardGroup;
