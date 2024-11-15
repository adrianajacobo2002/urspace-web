import React, { useState, useEffect } from "react";
import { 
  Box,
  Typography,
  Chip,
  CardMedia,
  Stack,
  Grid,
  Container,
  Divider,
  TextField,
  Button, 
} from "@mui/material";
import ParticlesBackground from "../ParticleBg";
import Navbar from "../../layouts/UserNavbar";
import AvatarWithInitials from "../Avatar";
import { getUserInfo } from "../../services/users.service";
import { createOffer } from "../../services/ofertas.service"; // Importa la función createOffer



import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Importamos componentes de react-leaflet

// Importar LightGallery y sus plugins
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "./DateRangeCustom.css";

interface DetalleTerrenoCompraProps {
  id: number;
  name: string;
  location: string;
  price: number;
  images: string[];
  rating: number;
  description: string;
  capacity: number;
  etiquetas: string[]; // Añadir etiquetas aquí
  latitud: number;
  longitud: number;
  usuario: {
    nombre: string;
    apellido: string;
    email: string;
  };
}

const DetalleTerrenoCompra: React.FC<DetalleTerrenoCompraProps> = ({
  id,
  name,
  location,
  price,
  images,
  description,
  capacity,
  etiquetas,
  latitud,
  longitud,
  usuario,
}) => {
  const [idUsuario, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userInfo = await getUserInfo();
        console.log("User Info:", userInfo); // Log para verificar

        if (!userInfo || !userInfo.id_usuario) {
          alert("No se pudo obtener el ID del usuario. Por favor, intenta nuevamente.");
          return;
        }
  
        setUsuarioId(userInfo.id_usuario);
        
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUserId();
  }, []);

  // Crear datos de imágenes para LightGallery
  const galleryImages = images.map((img) => ({
    src: img,
    thumb: img,
  }));

  

  const subtotal = price;
  const tax = subtotal*0.05; // Impuestos fijos
  const total = subtotal + tax;

  const handleOffer = async () => {
    if (idUsuario === null) {
      alert("No se pudo obtener la información del usuario. Por favor, intenta nuevamente.");
      return;
    }

    const today = new Date().toISOString(); // Obtener la fecha actual en formato ISO

    try {
      await createOffer({
        fecha_oferta: today,
        terreno_id: id,
      });
      alert("Oferta creada exitosamente");
    } catch (error) {
      alert("Hubo un error al crear la oferta");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        overflow: "hidden",
        color: "#000",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Banner con partículas */}
      <Box
        sx={{
          backgroundColor: "#04172b",
          minHeight: "50vh",
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
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
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
        <Container maxWidth="lg" sx={{ mt: -4, pt: 8 }}>
          <Grid container spacing={4}>
            {/* Columna principal de información */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "black" }}
              >
                {name}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#65348c", fontWeight: "bold" }}
              >
                {location} - Capacidad: {capacity} personas
              </Typography>

              {/* Datos del propietario */}
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" alignItems="center" spacing={2}>
                <AvatarWithInitials
                  firstName={usuario.nombre}
                  lastName={usuario.apellido}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {usuario.nombre} {usuario.apellido}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Propietario/a
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 3 }} />

              <Typography variant="body1" sx={{ mt: 2 }}>
                {description}
              </Typography>

              {/* Galería de imágenes con LightGallery */}
              <Box sx={{ mt: 4, width: "100%", maxWidth: "600px" }}>
                <Divider sx={{ my: 3 }} />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 2, color: "black" }}
                >
                  Fotografías
                </Typography>
                <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                  {galleryImages.map((image, index) => (
                    <a key={index} href={image.src} data-lg-size="1400-800">
                      <img
                        src={image.thumb}
                        alt={`Imagen ${index + 1}`}
                        style={{
                          maxHeight: "100px",
                          objectFit: "contain", // Mantiene la proporción original
                          borderRadius: 4,
                          margin: "0 8px 8px 0",
                        }}
                      />
                    </a>
                  ))}
                </LightGallery>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "black", mb: 2 }}
                >
                  Ubicación
                </Typography>
                <MapContainer
                  center={[latitud, longitud]}
                  zoom={15}
                  style={{ width: "100%", height: "400px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[latitud, longitud]}>
                    <Popup>{name}</Popup>
                  </Marker>
                </MapContainer>
              </Box>

            </Grid>

            {/* Tarjeta de reserva */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  padding: 3,
                  boxShadow: 1,
                  backgroundColor: "#f8f8f8",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "black" }}
                >
                  Precio
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#65348c", fontWeight: "bold" }}
                >
                  ${price} USD <Typography component="span"></Typography>
                </Typography>

                

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 2 }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Impuestos</Typography>
                  <Typography>${tax.toFixed(2)}</Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#65348c" }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#65348c" }}
                  >
                    ${total.toFixed(2)}
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#65348c" }}
                  fullWidth
                  onClick={handleOffer} // Asocia el botón a handleOffer

                >
                  Ofertar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DetalleTerrenoCompra;
