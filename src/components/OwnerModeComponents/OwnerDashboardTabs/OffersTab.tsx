import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import OfferCard from "../../OfferCard";
import { getOffersByCurrentUser } from "../../../services/ofertas.service";

const OffersTab: React.FC = () => {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffersByCurrentUser();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <Box>
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
