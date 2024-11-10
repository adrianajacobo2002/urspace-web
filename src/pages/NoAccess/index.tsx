// src/pages/NoAccess/index.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import AstronautImage from "../../assets/img/no-access.png"; // Asegúrate de tener esta imagen en el directorio correcto
import { useNavigate } from "react-router-dom";

const NoAccess: React.FC = () => {
  const navigate = useNavigate();

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

        {/* Contenido principal */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={AstronautImage}
            alt="Astronauta flotando"
            style={{
              maxWidth: "300px",
              animation: "float 4s ease-in-out infinite",
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Parece que no deberías de estar acá :(
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor: "#65348c",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#4E278C",
              },
            }}
          >
            Volver a Login
          </Button>
        </Box>
      </Box>

      {/* Estilos para la animación de flotación */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NoAccess;
