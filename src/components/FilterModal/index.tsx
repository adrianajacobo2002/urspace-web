import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography, Button, Chip } from '@mui/material';
import LocationSearch from "../LocationSearch";
import { fetchEtiquetas } from '../../services/etiquetas.service';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (country: string, city: string, etiquetas: number[]) => void;
  onClearFilters: () => void;
}

interface Etiqueta {
  id_etiqueta: number;
  nombre: string;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApplyFilters, onClearFilters }) => {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [selectedEtiquetas, setSelectedEtiquetas] = useState<number[]>([]);
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    console.log("Modal FilterModal se ha montado o actualizado");
    const fetchData = async () => {
      try {
        const etiquetasData = await fetchEtiquetas();
        setEtiquetas(etiquetasData);
      } catch (error) {
        console.error("Error al obtener etiquetas:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const handleEtiquetaClick = (id: number) => {
    setSelectedEtiquetas((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((etiquetaId) => etiquetaId !== id) : [...prevSelected, id]
    );
  };

  const handleApplyFiltersClick = () => {
    console.log('Botón Aplicar Filtros presionado'); // Verificar si el botón se presiona
    console.log('País seleccionado:', country, 'Ciudad seleccionada:', city, 'Etiquetas seleccionadas:', selectedEtiquetas);
    console.log('Aplicando filtros:', { country, city, selectedEtiquetas }); // Agrega este console.log para verificar
    onApplyFilters(country, city, selectedEtiquetas);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="filter-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <LocationSearch
          onCountryChange={setCountry}
          onCityChange={setCity}
        />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Etiquetas
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {etiquetas.map((etiqueta) => (
            <Chip
              key={etiqueta.id_etiqueta}
              label={etiqueta.nombre}
              variant={selectedEtiquetas.includes(etiqueta.id_etiqueta) ? "filled" : "outlined"}
              onClick={() => handleEtiquetaClick(etiqueta.id_etiqueta)}
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => {
    console.log("Botón Aplicar Filtros presionado en el modal"); // Verifica si se muestra este mensaje
    handleApplyFiltersClick();
  }}>
            Aplicar Filtros
          </Button>
          <Button variant="contained" color="error" onClick={onClearFilters}>
            Borrar Filtros
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;
