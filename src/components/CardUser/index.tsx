// src/components/CardUser/index.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import ModalUser from '../ModalUser/modal';

const CardUser: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Card
        sx={{
          width: 250,
          borderRadius: 3,
          padding: 2,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e6e0f8',
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Villa Bonita
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Estado: <span style={{ color: '#32a852' }}>Completa</span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            San Salvador, El Salvador
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: 1 }}>
            Total: $125
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleOpenModal} // Llama a la función para abrir el modal
            sx={{
              marginTop: 2,
              backgroundColor: '#4f3c75',
              color: 'white',
              '&:hover': { backgroundColor: '#3b2c57' },
              borderRadius: 2,
              width: '100%',
            }}
          >
            Escribir reseña
          </Button>
        </CardContent>
      </Card>

      {/* Modal de reseña */}
      <ModalUser open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default CardUser;
