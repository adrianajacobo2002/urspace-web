import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getReservasByCurrentUser } from "../../services/reservacion.service";
import "../ReservationCalendar/style.css";

interface ReservationEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    estado: string;
    property: string;
    userName: string;
  };
  classNames: string[];
}

const ReservationCalendar: React.FC = () => {
  const [events, setEvents] = useState<ReservationEvent[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await getReservasByCurrentUser();

        const calendarEvents = reservations.map((reservation: any) => ({
          id: reservation.id_reservacion,
          title: `${reservation.userName}\n${reservation.property}`,
          start: reservation.fecha_inicio,
          end: reservation.fecha_fin,
          extendedProps: {
            estado: reservation.estado,
            property: reservation.property,
            userName: reservation.userName,
          },
          classNames: reservation.estado === "Pendiente" ? ["event-pending"] : ["event-inprogress"],
        }));

        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const renderEventContent = (eventInfo: any) => (
    <div>
      <strong>{eventInfo.event.extendedProps.userName}</strong>
      <div>{eventInfo.event.extendedProps.property}</div>
      <div>{eventInfo.event.extendedProps.estado}</div>
    </div>
  );
  

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek",
      }}
      eventClick={(info) => alert(`Reserva en: ${info.event.extendedProps.property}`)}
    />
  );
};

export default ReservationCalendar;
