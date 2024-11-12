import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import OfferCard from "../../OfferCard";
import { getOffersByCurrentUser, deleteOffer } from "../../../services/ofertas.service";

const OffersTab: React.FC = () => {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffersByCurrentUser();
        console.log("Datos de ofertas:", data); // Verificar datos recibidos
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleRejectOffer = async (id_oferta: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#65348c',
      cancelButtonColor: '#6c757d', 
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOffer(id_oferta);
          // Filtra las ofertas para eliminar la oferta rechazada del estado
          setOffers((prevOffers) => prevOffers.filter((offer) => offer.id_oferta !== id_oferta));
          Swal.fire('Rechazada', 'La oferta ha sido rechazada.', 'success');
        } catch (error) {
          console.error("Error al rechazar la oferta:", error);
          Swal.fire('Error', 'Hubo un problema al rechazar la oferta.', 'error');
        }
      }
    });
  };

  return (
    <Box>
      <Box display="flex" gap={2} flexWrap="wrap">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id_oferta}
            initials={offer.initials}
            name={offer.name}
            property={offer.property}
            onMessageClick={offer.onMessageClick}
            onRejectClick={() => handleRejectOffer(offer.id_oferta)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OffersTab;
