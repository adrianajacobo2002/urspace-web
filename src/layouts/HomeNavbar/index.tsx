import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



export default function ButtonAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}>
          UrSpace
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button color="inherit" sx={{ color: '#fff', textTransform: 'none' }}>Inicio</Button>
          <Button color="inherit" sx={{ color: '#fff', textTransform: 'none' }}>¿Quiénes Somos?</Button>
          <Button 
              variant="outlined" 
              sx={{ borderColor: '#fff', color: '#fff', textTransform: 'none' }} 
              onClick={() => navigate('/login')}
            >
              Únete
            </Button>
        </Box>
      </Toolbar>
    </AppBar>
    </Box>
  );
}
