import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";

interface PropertyCardProps {
  images: string[];
  title: string;
  property: string;
  price: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ images, title, property, price }) => {
  const imageUrl = images.length > 0 ? images[0] : "https://via.placeholder.com/300x140";

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, width: 300 }}>
      <CardMedia
        component="img"
        height="200" // Ajusta la altura de la imagen según sea necesario
        image={imageUrl}
        alt={title}
        sx={{
          objectFit: "cover", // Asegura que la imagen cubre el área
          width: "100%",       // Asegura que cubre todo el ancho
        }}
      />
      <Box p={2}>
        <Typography variant="h6" sx={{ color: "black" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {property}
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="secondary">
          {price}
        </Typography>
      </Box>
    </Card>
  );
};

export default PropertyCard;
