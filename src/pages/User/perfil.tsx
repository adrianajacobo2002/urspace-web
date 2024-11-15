// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid 
} from "@mui/material";
import Navbar from "../../layouts/UserNavbar";
import CardUser from "../../components/CardUser/index";
import AvatarWithInitials from "../../components/Avatar";
import { getUserInfo, getAllReservasByCurrentUser } from "../../services/reservacion.service";
import ParticlesBackground from "../../components/ParticleBg"; // Importa tu fondo de partículas
import { cancelarReserva } from "../../services/reservacion.service"; // Importa el servicio de cancelación

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ transition: 'none' }} // Evita el movimiento al cambiar de tab
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PerfilUsuario: React.FC = () => {
  const [tabValue, setTabValue] = useState(2);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [reservas, setReservas] = useState<any[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo(user);

        const userReservas = await getAllReservasByCurrentUser();
        console.log("Reservas obtenidas:", userReservas); // Verifica aquí

        setReservas(userReservas);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const filterReservasByEstado = (estado: string) => {
    const result = reservas.filter((reserva) => reserva.estado === estado);
    console.log(`Reservas filtradas para el estado ${estado}:`, result);
    return result;

  };

  const handleCancelReserva = async (id: number) => {
    try {
      await cancelarReserva(id); // Llama al método de cancelación
      // Actualiza el estado de las reservas
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.id_reservacion === id ? { ...reserva, estado: "Cancelada" } : reserva
        )
      );
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#04172b",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Navbar />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        {/* Información del Usuario */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#f0f0f0",
            borderRadius: 3,
            padding: 4,
            width: "100%",
            maxWidth: 1120,
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          {userInfo && (
            <>
              <AvatarWithInitials
                firstName={userInfo.nombres}
                lastName={userInfo.apellidos}
              />
              <Box>
                <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
                  Nombre: {userInfo.nombres}
                </Typography>
                <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
                  Apellido: {userInfo.apellidos}
                </Typography>
                <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
                  DUI: {userInfo.dui || "No disponible"}
                </Typography>
                <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
                  Correo electrónico: {userInfo.email}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        {/* Pestañas con fondo y color de texto personalizados */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            color: "white",
            borderRadius: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: 4,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: { backgroundColor: "#6B3FA0" },
            }}
            sx={{ "& .MuiTab-root": { fontWeight: "bold", color: "white" }, "& .Mui-selected": { color: "#6B3FA0" } }}
          >
            
            <Tab label="Pendientes" />
            <Tab label="En Curso" />
            <Tab label="Completas" />
            <Tab label="Canceladas" />
          </Tabs>
        </Box>

        {/* Contenedor de tarjetas en cuadrícula con 4 columnas */}
        <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              {filterReservasByEstado("Pendiente").length > 0 ? (
                filterReservasByEstado("Pendiente").map((reserva) => (
                  <Grid item xs={12} sm={6} md={3} key={reserva.id_reservacion}>
                    <CardUser key={reserva.id_reservacion} {...reserva} mostrarResena={false} 
                     onCancelReserva={() => handleCancelReserva(reserva.id_reservacion)}
                    />
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" sx={{color:"white"}}>No hay reservas pendientes.</Typography>
                
              )}
            </Grid>
          </TabPanel>


          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {filterReservasByEstado("EnCurso").length > 0 ? (
                filterReservasByEstado("EnCurso").map((reserva) => (
                  <Grid item xs={12} sm={6} md={3} key={reserva.id_reservacion}>
                    <CardUser key={reserva.id_reservacion} {...reserva} mostrarResena={false} />
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" sx={{color:"white"}}>No hay reservas en curso.</Typography>
              )}
            </Grid>
          </TabPanel>

         
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2}>
              {filterReservasByEstado("Completada").length > 0 ? (
                filterReservasByEstado("Completada").map((reserva) => (
                  <Grid item xs={12} sm={6} md={3} key={reserva.id_reservacion}>
                    <CardUser key={reserva.id_reservacion} {...reserva} mostrarResena={true} />
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" sx={{color:"white"}}>No hay reservas completas.</Typography>
              )}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={2}>
              {filterReservasByEstado("Cancelada").length > 0 ? (
                filterReservasByEstado("Cancelada").map((reserva) => (
                  <Grid item xs={12} sm={6} md={3} key={reserva.id_reservacion}>
                    <CardUser key={reserva.id_reservacion} {...reserva} mostrarResena={false} />
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" sx={{color:"white"}}>No hay reservas canceladas.</Typography>
              )}
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default PerfilUsuario;
