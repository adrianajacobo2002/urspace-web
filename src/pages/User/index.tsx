// src/pages/Dashboard.tsx
import React from 'react';
import { Box, Typography, Button, keyframes } from '@mui/material';
import ParticlesBackground from '../../components/ParticleBg';
import AstronautImage from '../../assets/img/astronauta_explorando.svg'; // Imagen del astronauta

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
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Contenedor con fondo ondulado y partículas */}
      <Box
        sx={{
          backgroundColor: '#04172b',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          padding: 4,
          clipPath: 'ellipse(80% 100% at 50% 0%)', // Ajusta esta propiedad para dar forma ondulada
        }}
      >
        {/* Partículas de fondo en esta sección */}
        <ParticlesBackground />

        {/* Contenido del dashboard */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Bienvenido Usuario
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Es momento de explorar
        </Typography>

        {/* Botones */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#65348c', '&:hover': { backgroundColor: '#4e278c' } }}
          >
            Buscar Terreno
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#65348c', '&:hover': { backgroundColor: '#4e278c' } }}
          >
            Publicar Terreno
          </Button>
        </Box>

        {/* Imagen del astronauta en la esquina superior derecha con animación de flotación */}
        <Box
          component="img"
          src={AstronautImage}
          alt="Astronauta"
          sx={{
            position: 'absolute',
            top: '100px',
            right: '230px',
            maxWidth: '150px',
            zIndex: 2,
            animation: `${floatAnimation} 3s ease-in-out infinite`, // Aplica la animación de flotación
          }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
