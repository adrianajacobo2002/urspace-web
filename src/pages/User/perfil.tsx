// src/pages/Dashboard.tsx
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  
  Avatar,
  
} from "@mui/material";
import Navbar from "../../layouts/UserNavbar";
import UserCard from "../../components/CardUser/index"

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
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PerfilUsuario: React.FC = () => {
  const [tabValue, setTabValue] = useState(2);
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
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
            maxWidth: 900,
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#6B3FA0",
              width: 100,
              height: 100,
              fontSize: 40,
              marginBottom: 2,
            }}
          >
            JH
          </Avatar>

          <Box>
            <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
              Nombre: Jona
            </Typography>
            <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
              Apellido: Hill
            </Typography>
            <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
              Correo electrónico: JonaHill@gmail.com
            </Typography>
            <Typography variant="h6" sx={{ color: "#6B3FA0" }}>
              Número de Contacto: 7286-9867
            </Typography>
          </Box>
        </Box>

        {/* Pestañas con fondo morado y bordes redondeados */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            bgcolor: "#e6e0f8", // Fondo morado suave
            borderRadius: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: 4,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            centered
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": { fontWeight: "bold", color: "#6B3FA0" },
              "& .Mui-selected": { color: "#6B3FA0" },
            }}
          >
            <Tab label="Curso" />
            <Tab label="Pendientes" />
            <Tab label="Completas" />
            <Tab label="Canceladas" />
          </Tabs>
        </Box>

        {/* Contenedor de tarjetas con fondo morado y bordes redondeados */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            bgcolor: "#d1c4e9", // Fondo morado para el área de tarjetas
            borderRadius: 3,
            padding: 3,
          }}
        >
          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1">No hay tarjetas en curso.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography variant="body1">No hay tarjetas pendientes.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            
            <UserCard />

          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Typography variant="body1">No hay tarjetas canceladas.</Typography>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default PerfilUsuario;
