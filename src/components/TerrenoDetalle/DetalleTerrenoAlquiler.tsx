import React from "react";
import {
  Box,
  Typography,
  Chip,
  CardMedia,
  Stack,
  Grid,
  Container,
  Divider,

} from "@mui/material";
import ParticlesBackground from "../ParticleBg";
import Navbar from "../../layouts/UserNavbar";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AvatarWithInitials from "../Avatar";
import ImageGallery from "react-image-gallery";


interface DetalleTerrenoAlquilerProps {
  name: string;
  location: string;
  price: number;
  images: string[];
  rating: number;
  description: string;
  capacity: number;
  etiquetas: string[];
  usuario: {
    nombre: string;
    apellido: string;
    email: string;
  };
}

const DetalleTerrenoAlquiler: React.FC<DetalleTerrenoAlquilerProps> = ({
  name,
  location,
  price,
  images,
  rating,
  description,
  capacity,
  etiquetas,
  usuario,

}) => {
  const galleryImages = images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", overflow: "hidden", color: "#000" }}>
      {/* Navbar */}
      <Navbar />

      {/* Banner con partículas */}
      <Box
        sx={{
          backgroundColor: "#04172b",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          position: "relative",
          zIndex: 1,
          padding: 2,
        }}
      >
        <ParticlesBackground />
        {/* Contenido del banner en layout horizontal */}
        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{ position: "relative", zIndex: 1, maxWidth: 1200, px: 4 }}
        >
          <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              image={images[0] || "/path/to/placeholder.jpg"}
              alt={name}
              sx={{
                width: 250,
                height: 250,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" fontWeight="bold">
              Bienvenido a {name}
            </Typography>
            <Typography variant="h5" color="grey.300">
              {location}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {etiquetas.map((etiqueta, index) => (
                <Chip
                  key={index}
                  label={etiqueta}
                  sx={{
                    backgroundColor: "#65348c",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Información adicional del terreno - Contenedor blanco completo */}
      <Box
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: 4,
          width: "100%", // Ocupa el ancho completo
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          mt: -4,
          pt: 8, // Espacio adicional en la parte superior
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{color: "black"}}>
            {name}
          </Typography>
          <Typography variant="h6" sx={{color: "#65348c", fontWeight: "bold"}}>
            {location} - Capacidad: {capacity} personas
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <StarRoundedIcon fontSize="large" sx={{color: "#65348c"}}/>
            <Typography variant="subtitle1" sx={{color: "black"}}>{rating.toFixed(2)}</Typography>
          </Stack>
         {/* Datos del propietario */}
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" alignItems="center" spacing={2}>
          <AvatarWithInitials firstName={usuario.nombre} lastName={usuario.apellido} />
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {usuario.nombre} {usuario.apellido}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Anfitrión/a
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ my: 3 }} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {description}
          </Typography>

          <Box sx={{ mt: 4 }}>
          <Divider sx={{ my: 3 }} />
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Fotografías
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {images.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                    mb: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img}
                    alt={`Imagen ${index + 1}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default DetalleTerrenoAlquiler;
