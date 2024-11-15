// src/pages/Dashboard.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import Navbar from "../../layouts/UserNavbar";
import { useNavigate } from 'react-router-dom';


const GetStarted: React.FC = () => {
  const navigate = useNavigate();

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
      <ParticlesBackground />
      <Navbar />
      
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "800px",
          height: "300px",
          textAlign: "center",
          zIndex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Righteous", color: "#65348c", mb: 2 }}
        >
          Próximo Destino: Tu Propiedad 🪐
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "Onest", color: "#333", mb: 5, mt: 5 }}
        >
          ¡Bienvenido, capitán! Estás a punto de agregar un nuevo destino en nuestra galaxia!
        </Typography>
        
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#65348c",
            color: "#ffffff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#4e278c",
            },
            width: '200px',
            borderRadius: '15px'
          }}
          onClick={() => navigate('/crear-propiedad')}
        >
          Empezar
        </Button>
      </Box>
    </Box>
  );
};

export default GetStarted;
