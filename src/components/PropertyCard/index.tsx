import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";

interface PropertyCardProps {
  image: string;
  title: string;
  property: string;
  price: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ image, title, property, price }) => {
  return (
    <Card sx={{ width: 300, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
          {price} por noche
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
