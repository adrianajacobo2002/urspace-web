// src/components/EditPropertyForm.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTerrenoById, updateTerreno } from "../../services/terrenos.service";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import ParticlesBackground from "../../components/ParticleBg";
import Navbar from "../../layouts/UserNavbar";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipo_terreno: "",
    capacidad: 0,
    precio: 0,
  });

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (id) {
        try {
          const propertyData = await getTerrenoById(Number(id));
          if (propertyData) {
            setFormData({
              nombre: propertyData.name,
              descripcion: propertyData.description,
              tipo_terreno: propertyData.type,
              capacidad: propertyData.capacity,
              precio: propertyData.price,
            });
          }
        } catch (error) {
          console.error("Error loading property data:", error);
        }
      }
    };

    fetchPropertyData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "capacidad" || name === "precio" ? Number(value) : value,
    }));
  };

  const handleUpdateProperty = async () => {
    try {
      await updateTerreno(Number(id), formData);
      alert("Propiedad actualizada con éxito");
      navigate("/owner-mode");
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
      alert("Error al actualizar la propiedad");
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", backgroundColor: "#0d1b2a" }}>
      <Navbar />
      <ParticlesBackground />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          marginTop: "80px", // Ajuste para el espacio debajo de la barra de navegación
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: 800,
            width: "100%",
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#fff",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 3, color: "#65348c" }}>
            Editar propiedad
          </Typography>
          <Box display="flex" gap={2} sx={{ mb: 2 }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Tipo de propiedad"
              name="tipo_terreno"
              value={formData.tipo_terreno}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <TextField
            label="Descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Box display="flex" gap={2} sx={{ mb: 2 }}>
            <TextField
              label="Capacidad"
              name="capacidad"
              type="number"
              value={formData.capacidad}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Precio"
              name="precio"
              type="number"
              value={formData.precio}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleUpdateProperty}
            sx={{ backgroundColor: "#65348c", color: "#fff", "&:hover": { backgroundColor: "#4e278c" } }}
          >
            Editar Propiedad
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Edit;
