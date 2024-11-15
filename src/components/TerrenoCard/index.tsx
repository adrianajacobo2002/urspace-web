import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import StarIcon from "@mui/icons-material/Star";
import Placeholder from "../../assets/img/placeholder-image.png"; // Asegúrate de tener esta imagen en el directorio correcto
import { useNavigate } from "react-router-dom";


import "swiper/css";
import "swiper/css/pagination";

interface TerrenoCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  images: string[];
  type: "Venta" | "Alquiler";
  rating: number;
}

const TerrenoCard: React.FC<TerrenoCardProps> = ({
  id,
  name,
  location,
  price,
  images,
  type,
  rating,
}) => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/terreno/${id}`);
  };

  console.log("Imágenes recibidas en TerrenoCard:", images); // Verificar las URLs de las imágenes
  console.log("Imprimiendo imagenes",images)

  return (
    <Card sx={{ width: 300, height: 350, borderRadius: 2, boxShadow: 3, overflow: 'hidden' }} onClick={handleClick}>
      <Swiper modules={[Pagination]} pagination={{ clickable: true }} loop={true} className="mySwiper">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ width: "100%", height: 200, borderRadius: 8 }}
                onError={(e) => {
                  console.log("Error al cargar la imagen:", image);
                  (e.target as HTMLImageElement).src = "/path/to/placeholder-image.jpg";
                }}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src={Placeholder}
              alt="Imagen no disponible"
              style={{ width: "100%", height: 200, borderRadius: 8 }}
              
            />
          </SwiperSlide>
        )}
      </Swiper>

      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "inherit", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarIcon sx={{ color: "#65348c", fontSize: 20, mr: 0.5 }} />
              <Typography>{rating}</Typography>
            </Box>
          </Box>

          <Typography color="text.secondary" sx={{ textAlign: "left", mt: 0.5 }}>
            {location}
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 1, textAlign: "left", color: "inherit" }}>
            ${price} USD {type === "Alquiler" ? "por noche" : ""}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TerrenoCard;
