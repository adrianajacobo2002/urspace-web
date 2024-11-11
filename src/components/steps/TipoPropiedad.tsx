import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface TipoPropiedadProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  setIsStepValid: (isValid: boolean) => void;
}

enum TipoTerreno {
  Alquilar = "alquilar",
  Vender = "vender",
}

const TipoPropiedad: React.FC<TipoPropiedadProps> = ({
  selectedOption,
  setSelectedOption,
  setIsStepValid,
}) => {
  const handleOptionClick = (option: TipoTerreno) => {
    setSelectedOption(option);
    setIsStepValid(true);
    console.log("Opción seleccionada:", option); // Log para depuración
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 3, color: "#65348c" }}>
        ¿Qué quieres hacer con tu propiedad?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handleOptionClick(TipoTerreno.Alquilar)}
          sx={{
            borderColor: selectedOption === TipoTerreno.Alquilar ? "#65348c" : "grey",
            backgroundColor: selectedOption === TipoTerreno.Alquilar ? "#F0E8FF" : "white",
          }}
        >
          Alquilarla
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleOptionClick(TipoTerreno.Vender)}
          sx={{
            borderColor: selectedOption === TipoTerreno.Vender ? "#65348c" : "grey",
            backgroundColor: selectedOption === TipoTerreno.Vender ? "#F0E8FF" : "white",
          }}
        >
          Venderla
        </Button>
      </Box>
    </Box>
  );
};

export default TipoPropiedad;
