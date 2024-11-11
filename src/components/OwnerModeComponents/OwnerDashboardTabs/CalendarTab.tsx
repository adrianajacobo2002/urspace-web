import React from "react";
import { Box, Typography } from "@mui/material";

const CalendarTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Calendario
      </Typography>
      <Typography variant="body2">
        Aquí puedes ver las fechas reservadas para tus propiedades.
      </Typography>
    </Box>
  );
};

export default CalendarTab;
