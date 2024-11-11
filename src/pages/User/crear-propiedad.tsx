// src/pages/Dashboard.tsx
import React from "react";
import { Box} from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import Navbar from "../../layouts/UserNavbar";

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

        
      </Box>
    </Box>
  );
};

export default Dashboard;
