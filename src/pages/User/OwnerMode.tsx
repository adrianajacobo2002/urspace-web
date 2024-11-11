// src/pages/OwnerMode.tsx

import React from "react";
import { Box, Typography } from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import Navbar from "../../layouts/UserNavbar";
import OwnerDashboardTabs from "../../components/OwnerModeComponents/OwnerDashboardTabs";

const OwnerMode: React.FC = () => {
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
          clipPath: "ellipse(80% 100% at 50% 0%)",
        }}
      >
        <ParticlesBackground />

        <Box sx={{ position: "relative", zIndex: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            Bienvenido al modo propietario 🚀
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Gestiona tus propiedades y reservas en UrSpace
          </Typography>
        </Box>
      </Box>

      <OwnerDashboardTabs />
    </Box>
  );
};

export default OwnerMode;
