import React from "react";
import { Box, Typography } from "@mui/material";
import MiniCardReservation from "../../CountCard/MiniCardReservation";

const ReservationsTab: React.FC = () => {
  return (
    <Box>
      <MiniCardReservation />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reservaciones
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Aquí puedes ver las reservaciones de tus propiedades.
      </Typography>

      
    </Box>
  );
};

export default ReservationsTab;
