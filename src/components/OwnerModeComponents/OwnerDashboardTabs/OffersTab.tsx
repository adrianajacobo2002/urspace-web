// src/components/OwnerModeComponents/OwnerDashboardTabs/OffersTab.tsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import OfferCard from "../../OfferCard";
import { getOffersByCurrentUser, deleteOffer } from "../../../services/ofertas.service";
import { findOrCreateConversation } from "../../../services/conversaciones.service";
import { getUserInfo } from "../../../services/users.service";

const OffersTab: React.FC = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userInfo = await getUserInfo();
        setLoggedInUserId(userInfo.id_usuario);
      } catch (error) {
        console.error("Error obteniendo el ID del usuario logueado:", error);
      }
    };
    fetchUserId();

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
          setOffers((prevOffers) => prevOffers.filter((offer) => offer.id_oferta !== id_oferta));
          Swal.fire('Rechazada', 'La oferta ha sido rechazada.', 'success');
        } catch (error) {
          console.error("Error al rechazar la oferta:", error);
          Swal.fire('Error', 'Hubo un problema al rechazar la oferta.', 'error');
        }
      }
    });
  };

  const handleMessageClick = async (usuarioDestinatarioId: number) => {
    if (loggedInUserId === null) return;

    try {
      await findOrCreateConversation(loggedInUserId, usuarioDestinatarioId);
      window.location.href = "/chat";
    } catch (error) {
      console.error("Error al crear o encontrar la conversación:", error);
    }
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
            usuarioDestinatarioId={offer.usuario_id}
            loggedInUserId={loggedInUserId ?? 0}
            onMessageClick={() => handleMessageClick(offer.usuario_id)}
            onRejectClick={() => handleRejectOffer(offer.id_oferta)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OffersTab;
