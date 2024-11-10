// src/pages/Dashboard.tsx
import React from 'react';
import { AppBar, Box, CssBaseline, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Barra de navegación superior */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#65348c",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Bienvenido al Dashboard
        </Typography>
        <Typography paragraph>
          Aquí puedes ver las estadísticas y otra información relevante para la administración de la plataforma.
        </Typography>
      </Box>
    </Box>
  );
}
