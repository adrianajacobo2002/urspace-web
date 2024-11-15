import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button, Tabs, Tab } from "@mui/material";
import Navbar from "../../layouts/UserNavbar";
import TerrenoCard from "../../components/TerrenoCard";
import {
  getTerrenosExcluyendoUsuario,
  fetchFilteredTerrenos,
} from "../../services/terrenos.service";
import { getUserInfo } from "../../services/users.service";
import FilterModal from "../../components/FilterModal";

interface Terreno {
  id: number;
  name: string;
  location: string;
  price: number;
  type: "Alquiler" | "Venta";
  rating: number;
  images: string[];
}

const Navegar: React.FC = () => {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [tab, setTab] = useState(0);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        const userInfo = await getUserInfo();
        const usuarioId = userInfo.id_usuario;
        console.log("Obteniendo terrenos excluyendo al usuario:", usuarioId);

        const terrenosData = await getTerrenosExcluyendoUsuario(usuarioId);
        console.log(
          "Terrenos recibidos del servidor (sin filtrar):",
          terrenosData
        );

        // Mapeamos los datos para asegurar que las imágenes están estructuradas correctamente
        const mappedTerrenos = terrenosData.map((terreno: any) => {
          const images =
            terreno.ImagenTerreno && terreno.ImagenTerreno.length > 0
              ? terreno.ImagenTerreno.map(
                  (img: any) => `http://localhost:3000${img.url_imagen}`
                )
              : [];

          console.log(
            "Imágenes mapeadas para terreno ID",
            terreno.id_terreno,
            ":",
            images
          );

          return {
            id: terreno?.id || terreno?.id_terreno, // Cambiar a la propiedad correcta según la estructura
            name: terreno?.name || terreno?.nombre, // Cambiar a la propiedad correcta según la estructura
            location: terreno?.location || terreno?.ubicacion, // Cambiar a la propiedad correcta según la estructura
            price: terreno?.price || terreno?.precio, // Cambiar a la propiedad correcta según la estructura
            type: terreno?.type || terreno?.tipo_terreno, // Cambiar a la propiedad correcta según la estructura
            rating: terreno?.rating || terreno?.calificacion || 0,
            images: terreno?.ImagenTerreno
              ? terreno.ImagenTerreno.map((img: any) => img.url_imagen)
              : [],
            
          };
        });

        console.log("Terrenos mapeados:", mappedTerrenos);
        
        setTerrenos(mappedTerrenos);
      } catch (error) {
        console.error("Error al obtener terrenos:", error);
      }
    };

    fetchTerrenos();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("Cambiando tab a:", newValue === 0 ? "Alquilar" : "Venta");
    setTab(newValue);
  };

  const handleOpenFilterModal = () => {
    console.log("Abriendo modal de filtros");
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleApplyFilters = async (
    country: string,
    city: string,
    etiquetas: number[]
  ) => {
    try {
      console.log("Llamando a fetchFilteredTerrenos con:", {
        country,
        city,
        etiquetas,
      });
      const terrenosFiltrados = await fetchFilteredTerrenos(
        country,
        city,
        etiquetas
      );
      console.log("Terrenos filtrados recibidos:", terrenosFiltrados);

      const mappedTerrenos = terrenosFiltrados.map((terreno: any) => {
        const images =
          terreno.ImagenTerreno && terreno.ImagenTerreno.length > 0
            ? terreno.ImagenTerreno.map(
                (img: any) => `http://localhost:3000${img.url_imagen}`
              )
            : [];

        console.log(
          "Imágenes mapeadas para terreno filtrado ID",
          terreno.id_terreno,
          ":",
          images
        );

        return {
          id: terreno.id_terreno,
          name: terreno.nombre,
          location: terreno.ubicacion,
          price: terreno.precio,
          type: terreno.tipo_terreno,
          rating: terreno.calificacion || 0,
          images: images,
        };
      });

      console.log("Terrenos filtrados mapeados:", mappedTerrenos);
      setTerrenos(mappedTerrenos);
      setFilterModalOpen(false);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  const handleClearFilters = async () => {
    try {
      const userInfo = await getUserInfo();
      const usuarioId = userInfo.id_usuario;
      const terrenosData = await getTerrenosExcluyendoUsuario(usuarioId);

      const mappedTerrenos = terrenosData.map((terreno: any) => {
        const images =
          terreno.ImagenTerreno && terreno.ImagenTerreno.length > 0
            ? terreno.ImagenTerreno.map(
                (img: any) => `http://localhost:3000${img.url_imagen}`
              )
            : [];

        console.log(
          "Imágenes mapeadas para terreno ID",
          terreno.id_terreno,
          ":",
          images
        );

        return {
          id: terreno.id_terreno,
          name: terreno.nombre,
          location: terreno.ubicacion,
          price: terreno.precio,
          type: terreno.tipo_terreno,
          rating: terreno.calificacion || 0,
          images: images,
        };
      });

      setTerrenos(mappedTerrenos);
      setFilterModalOpen(false);
    } catch (error) {
      console.error("Error al limpiar los filtros:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Box sx={{ textAlign: "center", mt: 4, px: 4, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "inherit" }}>
          Explora Propiedades Disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Encuentra el lugar perfecto para{" "}
          <span style={{ color: "#65348c", fontWeight: "bold" }}>comprar</span>{" "}
          o{" "}
          <span style={{ color: "#65348c", fontWeight: "bold" }}>alquilar</span>{" "}
          para tu evento o escapada ideal.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Alquilar" />
            <Tab label="Comprar" />
          </Tabs>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#65348c" }}
            onClick={handleOpenFilterModal}
          >
            Filtros
          </Button>
        </Box>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="flex-start"
          alignItems="stretch"
          flexWrap="wrap"
        >
          {terrenos
            .filter((terreno) => {
              console.log(
                `Filtrando terrenos por tipo (${tab === 0 ? "Alquiler" : "Venta"}):`,
                terreno.type
              );
              return tab === 0
                ? terreno.type === "Alquiler"
                : terreno.type === "Venta";
            })
            .map((terreno) => (
              <Box key={terreno.id} sx={{ width: "300px" }}>
                <TerrenoCard
                  id = {terreno.id}
                  name={terreno.name}
                  location={terreno.location}
                  price={terreno.price}
                  images={terreno.images}
                  type={terreno.type}
                  rating={terreno.rating}
                />
              </Box>
            ))}
        </Stack>
      </Box>

      <FilterModal
        open={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </Box>
  );
};

export default Navegar;
