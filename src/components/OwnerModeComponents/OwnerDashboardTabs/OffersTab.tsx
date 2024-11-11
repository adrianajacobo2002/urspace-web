import React from "react";
import { Box, Typography } from "@mui/material";
import OfferCard from "../../OfferCard"; // Ajusta la ruta si es necesario

const OffersTab: React.FC = () => {
  // Datos de ejemplo para las ofertas
  const offers = [
    {
      initials: "MB",
      name: "María B.",
      property: "Casa de Playa, La Libertad",
      onMessageClick: () => alert("Mensaje enviado a María B."),
      onRejectClick: () => alert("Oferta rechazada para María B."),
    },
    {
      initials: "RC",
      name: "Roberto C.",
      property: "Villa Bonita, San Salvador",
      onMessageClick: () => alert("Mensaje enviado a Roberto C."),
      onRejectClick: () => alert("Oferta rechazada para Roberto C."),
    },
  ];

  return (
    <Box>
      {/* Contenedor de tarjetas de oferta */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            initials={offer.initials}
            name={offer.name}
            property={offer.property}
            onMessageClick={offer.onMessageClick}
            onRejectClick={offer.onRejectClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OffersTab;
