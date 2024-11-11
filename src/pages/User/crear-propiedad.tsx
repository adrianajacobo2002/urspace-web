// src/pages/CrearPropiedad.tsx
import React from "react";
import { Box, Typography, Button, Stepper, Step, StepLabel } from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import Navbar from "../../layouts/UserNavbar";
import { StepIconProps } from "@mui/material/StepIcon"; // Importa el tipo StepIconProps


// Pasos del Stepper
const steps = ["Tipo de propiedad", "Información de la propiedad", "Ubicación"];


function ColorlibStepIcon(props: StepIconProps) { // Usa StepIconProps como el tipo de props
  return (
    <Box
      sx={{
        backgroundColor: props.active ? "#65348c" : "#E0E0E0",
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {props.icon}
    </Box>
  );
}

// Conector del Stepper
const ColorlibConnector = () => (
  <Box
    sx={{
      height: 1,
      width: "100%",
      backgroundColor: "#65348c",
    }}
  />
);

const CrearPropiedad: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <ParticlesBackground />

      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "80%",
          maxWidth: "600px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Righteous", color: "#65348c", mb: 4 }}
        >
          Agregar propiedad
        </Typography>

        {/* Stepper */}
        <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography variant="h6" sx={{ mt: 4 }}>
          ¿Qué quieres hacer con tu propiedad?
        </Typography>

        {/* Opciones de Alquilar o Vender */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#EDE7F6",
              color: "#65348c",
              border: "2px solid #65348c",
              width: 150,
              height: 100,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#D1C4E9",
              },
            }}
          >
            Alquilarla
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#65348c",
              color: "#65348c",
              width: 150,
              height: 100,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f4f4f4",
              },
            }}
          >
            Venderla
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CrearPropiedad;
