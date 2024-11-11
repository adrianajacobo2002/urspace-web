import React from "react";
import { Box, Typography } from "@mui/material";

const OffersTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ofertas
      </Typography>
      <Typography variant="body2">
        Aquí puedes revisar las ofertas que has recibido.
      </Typography>
    </Box>
  );
};

export default OffersTab;
