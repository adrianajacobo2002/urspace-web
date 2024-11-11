// src/pages/Login/index.tsx
import * as React from "react";
import { useState } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import loginImage from "../../assets/img/login.png"; 
import { login } from '../../services/users.service';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Link as RouterLink } from 'react-router-dom'; // Importa Link de react-router-dom



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Limpiar errores anteriores
    console.log("Initiating login process");

    try {
      console.log("Calling login service with:", { email, password }); // Log para ver los datos de entrada
      const data = await login(email, password);
      console.log("Login successful, received data:", data); // Log cuando el login es exitoso
      localStorage.setItem('token', data.token); // Guardar el token en LocalStorage
      navigate('/dashboard'); // Redirigir a una ruta protegida, como el dashboard
      console.log("Navigated to /dashboard"); // Log para confirmar la navegación
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.error("Login error:", err.message); 
        setError(err.response.data.message); // Mostrar mensaje de error específico
      } else {
        setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.'); // Mensaje genérico para otros errores
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#E0E0E0",
      }}
    >
      <Card
        sx={{
          display: "flex",
          borderRadius: "15px",
          overflow: "hidden",
          width: { xs: "100%", sm: "1000px" },
        }}
      >
        {/* Imagen de Fondo */}
        <CardMedia
          component="img"
          sx={{ width: 500, objectFit: "cover" }}
          image={loginImage}
          alt="Astronauta"
        />

        {/* Panel de Formulario */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent
            sx={{
              width: "100%", // Asegura que el contenido use todo el ancho disponible
              maxWidth: 400, // Limita el ancho del formulario
              padding: 3,
              textAlign: "center",
            }}
            component="form"
            onSubmit={handleLogin}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 2, color: '#65348c' }}
            >
              Iniciar Sesión
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              id="email" // ID para integrar con la API
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
              id="password" // ID para integrar con la API
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

            

            <Button
              id="login-button" // ID para integrar con la API
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#65348c",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#4E278C",
                },
                marginTop: "20px",
                marginBottom: "20px",
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Iniciar Sesión
            </Button>

            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                display: "block",
                textAlign: "center",
                color: "#65348c",
                mt: 1,
                mb: 2,
              }}
            >
              ¿No tienes una cuenta? Regístrate
            </Link>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
