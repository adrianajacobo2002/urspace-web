// src/pages/LandingPage.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import TypewriterText from "../../components/TypewriterText";
import Navbar from "../../layouts/HomeNavbar";
import AstronautImage from "../../assets/img/home-astronaut.png"; // Asegúrate de tener esta imagen en el directorio correcto

const LandingPage: React.FC = () => {
  return (
    <div>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#04172b",
          color: "#fff",
        }}
      >
        {/* Fondo de Partículas */}
        <ParticlesBackground />

        {/* Navbar */}
        <Navbar />

        {/* Imagen del Astronauta y Texto */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={AstronautImage}
            alt="Astronauta en la luna"
            style={{ maxWidth: "1000px" }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
            }}
          >
            <TypewriterText />
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
