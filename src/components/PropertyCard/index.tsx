import React from "react";
import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
        height="200"
        image={imageUrl}
        alt={title}
        sx={{
          objectFit: "cover",
          width: "100%",
        }}
      />
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              color: "black",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "170px", 
            }}
          >
            {title}
          </Typography>
          <Box>
            <IconButton sx={{ color: "#65348c" }}>
              <EditIcon />
            </IconButton>
            <IconButton sx={{ color: "#65348c" }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
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
