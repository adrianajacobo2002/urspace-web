// src/pages/Dashboard.tsx
import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@mui/material';


const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
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
