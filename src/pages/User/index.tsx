// src/pages/Dashboard.tsx
import React from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import AstronautImage from "../../assets/img/astronauta_explorando.svg";
import Navbar from "../../layouts/UserNavbar";
import PlanetImage from "../../assets/img/planeta.png"; // Imagen del planeta

// Definición de la animación de flotación
const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Ajusta la altura de la flotación */
  }
  100% {
    transform: translateY(0);
  }
`;

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Contenedor con fondo ondulado y partículas */}
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#04172b",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          padding: 4,
          clipPath: "ellipse(80% 100% at 50% 0%)", // Ajusta esta propiedad para dar forma ondulada
        }}
      >
        {/* Partículas de fondo en esta sección */}
        <ParticlesBackground />

        <Box sx={{ position: "relative", zIndex: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            Bienvenido Usuario
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Es momento de explorar
          </Typography>

          {/* Botones */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 5 }}
          >
            <Button
              variant="contained"
              sx={{
                width: "200px",
                backgroundColor: "#65348c",
                "&:hover": { backgroundColor: "#4e278c" },
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Buscar Terreno
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "200px",
                backgroundColor: "#65348c",
                "&:hover": { backgroundColor: "#4e278c" },
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Publicar Terreno
            </Button>
          </Box>
        </Box>

        {/* Imagen del astronauta en la esquina superior derecha con animación de flotación */}
        <Box
          component="img"
          src={AstronautImage}
          alt="Astronauta"
          sx={{
            position: "absolute",
            top: "150px",
            right: "230px",
            maxWidth: "200px",
            zIndex: 2,
            animation: `${floatAnimation} 3s ease-in-out infinite`, // Aplica la animación de flotación
          }}
        />

        <Box
          component="img"
          src={PlanetImage}
          alt="Planeta"
          sx={{
            position: "absolute",
            top: "150px",
            left: "200px",
            maxWidth: "200px", // Ajusta el tamaño del planeta
            zIndex: 2,
            animation: `${floatAnimation} 4s ease-in-out infinite`, // Aplica la animación de flotación
          }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
