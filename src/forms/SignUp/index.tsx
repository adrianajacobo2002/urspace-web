// src/pages/Login/index.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import loginImage from "../../assets/img/login.png"; // Asegúrate de que esta imagen esté en el directorio correcto

export default function Signup() {
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
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 2, color: '#65348c' }}
            >
              Iniciar Sesión
            </Typography>

            <TextField
              id="email" // ID para integrar con la API
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              id="password" // ID para integrar con la API
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
            />

            

            <Button
              id="login-button" // ID para integrar con la API
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#65348c",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#4E278C",
                },
                marginTop: "20px",
                marginBottom: "20px"
              }}
            >
              Iniciar Sesión
            </Button>

            <Link
              href="#"
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
