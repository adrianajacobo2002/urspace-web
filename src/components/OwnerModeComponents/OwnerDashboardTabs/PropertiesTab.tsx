// src/components/PropertiesTab.tsx

import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MiniCardGroup from "../../CountCard/MiniCardGroup";
import PropertyCard from "../../PropertyCard"; // Ajusta la ruta si es necesario

const PropertiesTab: React.FC = () => {
  // Ejemplo de datos de propiedades
  const properties = [
    {
      image: "https://via.placeholder.com/300x140",
      title: "Villa Bonita",
      property: "San Salvador, El Salvador",
      price: "$65.00 USD",
    },
    {
      image: "https://via.placeholder.com/300x140",
      title: "Casa Bella",
      property: "Antigua Guatemala, Guatemala",
      price: "$120.00 USD",
    },
  ];

  return (
    <Box>
      {/* Contenedor principal de la pestaña */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <MiniCardGroup />
        {/* Botón de agregar en la esquina superior derecha */}
        <IconButton
          sx={{
            backgroundColor: "#65348c",
            color: "#fff",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#4e278c",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      

      {/* Contenedor de las tarjetas de propiedades */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            image={property.image}
            title={property.title}
            property={property.property}
            price={property.price}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PropertiesTab;
