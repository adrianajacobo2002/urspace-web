import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MiniCardReservation from "../../CountCard/MiniCardReservation";
import ReservationCard from "../../ReservationCard";
import { getReservasByCurrentUser } from "../../../services/reservacion.service";

interface Reservation {
  initials: string;
  name: string;
  date: string;
  status: string;
  property: string;
}

const ReservationsTab: React.FC = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Todas");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservasByCurrentUser();
        setReservations(data);
        setFilteredReservations(data); // Initialize with all reservations
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  const handleFilterChange = (status: string) => {
    setActiveFilter(status);

    if (status === "Todas") {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter(
        (reservation: any) => reservation.estado === status
      );
      setFilteredReservations(filtered);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#65348c", paddingY: 2 }}>
        Reservaciones
      </Typography>
      <MiniCardReservation
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
        reservationCounts={{
          Todas: reservations.length,
          Pendiente: reservations.filter((r: any) => r.estado === "Pendiente").length,
          EnCurso: reservations.filter((r: any) => r.estado === "EnCurso").length,
        }}
      />
      <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
        {filteredReservations.map((reservation: any, index) => (
          <ReservationCard
            key={index}
            initials={`${reservation.Usuario.nombres[0]}${reservation.Usuario.apellidos[0]}`}
            name={`${reservation.Usuario.nombres} ${reservation.Usuario.apellidos}`}
            dateStart={reservation.fecha_inicio}
            dateEnd={reservation.fecha_fin}
            status={reservation.estado.replace(/([A-Z])/g, ' $1').trim()}
            property={reservation.Terreno.nombre}
            onMessageClick={() => alert(`Mensaje para ${reservation.Usuario.nombres}`)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ReservationsTab;