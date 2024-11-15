import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MiniCardReservation from "../../CountCard/MiniCardReservation";
import ReservationCard from "../../ReservationCard";
import { getReservasByCurrentUser } from "../../../services/reservacion.service";
import { getUserInfo } from "../../../services/users.service";

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
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  useEffect(() => {
    // Obtener el ID del usuario logueado
    const fetchUserId = async () => {
      try {
        const userInfo = await getUserInfo(); // Asegúrate de tener una función que obtenga el ID del usuario logueado
        setLoggedInUserId(userInfo.id_usuario);
      } catch (error) {
        console.error("Error obteniendo el ID del usuario logueado:", error);
      }
    };
    fetchUserId();

    const fetchReservations = async () => {
      try {
        const data = await getReservasByCurrentUser();
        setReservations(data);
        setFilteredReservations(data); // Inicializar con todas las reservaciones
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
            usuarioDestinatarioId={reservation.Usuario.id_usuario} // Asegúrate de que este campo existe en la estructura de reserva
            loggedInUserId={loggedInUserId ?? 0} // Pasar el ID del usuario logueado, usando 0 como fallback en caso de que sea null
            onMessageClick={(conversationId, otherUserName, otherUserInitials) => {
              console.log("Conversación ID:", conversationId, "Usuario:", otherUserName);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ReservationsTab;
