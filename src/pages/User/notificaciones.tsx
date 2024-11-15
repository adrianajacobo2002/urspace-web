// src/pages/User/Notificaciones.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../../layouts/UserNavbar";
import ParticlesBackground from "../../components/ParticleBg";
import NotificationCard from "../../components/NotificationCard";
import {
  getNotificacionesByUsuario,
  listenForRealTimeNotifications,
  markNotificacionAsRead,
  joinUserNotificationRoom,
} from "../../services/notificacion.service";

const Notificaciones: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);

  useEffect(() => {
    // Cargar notificaciones al iniciar
    const fetchNotificaciones = async () => {
      try {
        const data = await getNotificacionesByUsuario();
        setNotificaciones(data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchNotificaciones();

    // Unirse a la sala de notificaciones del usuario logueado
    const userId = parseInt(localStorage.getItem("userId") || "0"); // Asegúrate de obtener el ID correctamente
    if (userId) {
      joinUserNotificationRoom(userId);
    }

    // Escuchar notificaciones en tiempo real
    listenForRealTimeNotifications((newNotificacion) => {
      setNotificaciones((prev) => [newNotificacion, ...prev]);
    });
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificacionAsRead(id);
      setNotificaciones((prev) =>
        prev.map((noti) => (noti.id_notificacion === id ? { ...noti, leido: true } : noti))
      );
    } catch (error) {
      console.error("Error al marcar la notificación como leída:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", padding: 4 }}>
      <Navbar />
      <ParticlesBackground />
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Mis notificaciones
        </Typography>
        <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
          {notificaciones.map((notificacion) => (
            <NotificationCard
              key={notificacion.id_notificacion}
              mensaje={notificacion.mensaje}
              leido={notificacion.leido}
              onMarkAsRead={() => handleMarkAsRead(notificacion.id_notificacion)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Notificaciones;
