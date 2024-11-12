// src/pages/Navegar.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button, Tabs, Tab } from '@mui/material';
import Navbar from '../../layouts/UserNavbar';
import TerrenoCard from '../../components/TerrenoCard';
import { getTerrenosExcluyendoUsuario } from '../../services/terrenos.service';
import { getUserInfo } from '../../services/users.service';
import FilterModal from '../../components/FilterModal';

interface Terreno {
  id: number;
  name: string;
  location: string;
  price: number;
  type: 'Alquiler' | 'Venta';
  rating: number;
  images: string[];
}

const Navegar: React.FC = () => {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [tab, setTab] = React.useState(0);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        const userInfo = await getUserInfo();
        const usuarioId = userInfo.id_usuario;
        const terrenosData = await getTerrenosExcluyendoUsuario(usuarioId);
        setTerrenos(terrenosData);
      } catch (error) {
        console.error("Error al obtener terrenos:", error);
      }
    };

    fetchTerrenos();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    // Lógica para aplicar los filtros
    setFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    // Lógica para limpiar los filtros
    setFilterModalOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      <Box sx={{ textAlign: 'center', mt: 4, px: 4, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "inherit" }}>
          Explora Propiedades Disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Encuentra el lugar perfecto para <span style={{ color: '#65348c', fontWeight: "bold" }}>comprar</span> o <span style={{ color: '#65348c', fontWeight: "bold" }}>alquilar</span> para tu evento o escapada ideal.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Tabs value={tab} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary">
            <Tab label="Alquilar" />
            <Tab label="Comprar" />
          </Tabs>
          <Button variant="contained" sx={{ backgroundColor: '#65348c' }} onClick={handleOpenFilterModal}>
            Filtros
          </Button>
        </Box>

        <Stack direction="row" spacing={3} justifyContent="flex-start" alignItems="stretch" flexWrap="wrap">
          {terrenos
            .filter((terreno) => (tab === 0 ? terreno.type === 'Alquiler' : terreno.type === 'Venta'))
            .map((terreno) => (
              <Box key={terreno.id} sx={{ width: '300px' }}>
                <TerrenoCard
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
