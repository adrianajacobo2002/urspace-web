// src/components/steps/TipoPropiedad.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface TipoPropiedadProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  setIsStepValid: (isValid: boolean) => void;
}

const TipoPropiedad: React.FC<TipoPropiedadProps> = ({
  selectedOption,
  setSelectedOption,
  setIsStepValid,
}) => {
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsStepValid(true);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 3, color: "#65348c" }}>
        ¿Qué quieres hacer con tu propiedad?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handleOptionClick("alquilar")}
          sx={{
            borderColor: selectedOption === "alquilar" ? "#65348c" : "grey",
            backgroundColor: selectedOption === "alquilar" ? "#F0E8FF" : "white",
          }}
        >
          Alquilarla
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleOptionClick("vender")}
          sx={{
            borderColor: selectedOption === "vender" ? "#65348c" : "grey",
            backgroundColor: selectedOption === "vender" ? "#F0E8FF" : "white",
          }}
        >
          Venderla
        </Button>
      </Box>
    </Box>
  );
};

export default TipoPropiedad;
