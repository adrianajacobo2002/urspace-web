// src/pages/Dashboard.tsx
import React from "react";
import { Box} from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import Navbar from "../../layouts/UserNavbar";

const Notificaciones: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <ParticlesBackground />
      
    </Box>
  );
};

export default Notificaciones; 