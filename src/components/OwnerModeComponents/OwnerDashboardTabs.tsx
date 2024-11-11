// src/components/OwnerDashboardTabs.tsx

import React, { useState } from "react";
import { Box, Tab, Tabs, Card, CardContent } from "@mui/material";
import ReservationsTab from "./OwnerDashboardTabs/ReservationsTab";
import CalendarTab from "./OwnerDashboardTabs/CalendarTab";
import PropertiesTab from "./OwnerDashboardTabs/PropertiesTab";
import OffersTab from "./OwnerDashboardTabs/OffersTab";

const OwnerDashboardTabs: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Card
        sx={{
          width: "80%",
          bgcolor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ bgcolor: "#f5f5f5" }}
        >
          <Tab label="Reservas" sx={{ textTransform: "none" }}/>
          <Tab label="Calendario" sx={{ textTransform: "none" }}/>
          <Tab label="Mis Propiedades" sx={{ textTransform: "none" }}/>
          <Tab label="Ofertas" sx={{ textTransform: "none" }}/>
        </Tabs>

        <CardContent>
          {tabIndex === 0 && <ReservationsTab />}
          {tabIndex === 1 && <CalendarTab />}
          {tabIndex === 2 && <PropertiesTab />}
          {tabIndex === 3 && <OffersTab />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OwnerDashboardTabs;
