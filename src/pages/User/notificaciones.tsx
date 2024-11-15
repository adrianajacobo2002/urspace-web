import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import NotificationCard from "../../components/NotificationCard";
import {
  getNotificacionesByUsuario,
  markNotificacionAsRead
} from "../../services/notificacion.service";
import { getUserInfo } from "../../services/users.service";
import LoggedNavbar from "../../layouts/UserNavbar";
import ParticlesBackground from "../../components/ParticleBg";

interface Notificacion {
  id_notificacion: number;
  mensaje: string;
  leido: boolean;
}

const Notificaciones: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const user = await getUserInfo();
        setUserId(user.id_usuario);
        console.log("Usuario obtenido:", user);

        const data = await getNotificacionesByUsuario(user.id_usuario);
        console.log("Notificaciones obtenidas para el usuario:", data);
        setNotificaciones(data);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      }
    };

    fetchNotificaciones();
  }, []);

  const handleMarkAsRead = async (id_notificacion: number) => {
    try {
      await markNotificacionAsRead(id_notificacion);
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacion) =>
          notificacion.id_notificacion === id_notificacion
            ? { ...notificacion, leido: true }
            : notificacion
        )
      );
    } catch (error) {
      console.error("Error al marcar como leída:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0a1929", position: "relative" }}>
      <LoggedNavbar />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <ParticlesBackground />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 4,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            padding: 3,
            width: "90%",
            maxWidth: "800px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#333", marginBottom: 3 }}>
            Mis notificaciones
          </Typography>
          {notificaciones.length > 0 ? (
            notificaciones.map((notificacion) => (
              <NotificationCard
                key={notificacion.id_notificacion}
                mensaje={notificacion.mensaje}
                leido={notificacion.leido}
                onMarkAsRead={() => handleMarkAsRead(notificacion.id_notificacion)}
              />
            ))
          ) : (
            <Typography variant="body1" sx={{ color: "#555" }}>
              No hay notificaciones disponibles.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Notificaciones;
