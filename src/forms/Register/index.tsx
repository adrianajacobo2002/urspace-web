// src/pages/Register/index.tsx
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import registerImage from '../../assets/img/signup.png'; // Cambia la imagen si es necesario
import { register } from '../../services/users.service';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export default function Register() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dui, setDui] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Limpiar errores anteriores
    console.log("Initiating registration process");

    try {
      console.log("Calling register service with:", { nombres, apellidos, email, password, dui });
      const data = await register(nombres, apellidos, email, password, dui);
      console.log("Registration successful, received data:", data);
      navigate('/login'); // Redirigir al login después del registro exitoso
      console.log("Navigated to /login");
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.error("Registration error:", err.message);
        setError(err.response.data.message); // Mostrar mensaje de error específico
      } else {
        setError('Error al registrarse. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#E0E0E0',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          borderRadius: '15px',
          overflow: 'hidden',
          width: { xs: '100%', sm: '1000px' },
        }}
      >
        {/* Imagen de Fondo */}
        <CardMedia
          component="img"
          sx={{ width: 500, objectFit: 'cover', height: '650px' }}
          image={registerImage}
          alt="Rocket"
        />

        {/* Panel de Formulario */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              maxWidth: 400,
              padding: 3,
              textAlign: 'center',
            }}
            component="form"
            onSubmit={handleRegister}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, color: '#65348c' }}
            >
              Registrarse
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              id="nombres"
              label="Nombres"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
            <TextField
              id="apellidos"
              label="Apellidos"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
            <TextField
              id="email"
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              id="dui"
              label="DUI"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
              value={dui}
              onChange={(e) => setDui(e.target.value)}
              required
            />

            <Button
              id="register-button"
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: '#65348c',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#4E278C',
                },
                marginTop: '20px',
                marginBottom: '20px',
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Registrarse
            </Button>

            <Link
              href="/login"
              sx={{
                display: 'block',
                textAlign: 'center',
                color: '#65348c',
                mt: 1,
                mb: 2,
              }}
            >
              ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
