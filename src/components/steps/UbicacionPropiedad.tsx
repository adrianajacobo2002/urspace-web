import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";

interface LocationData {
  lat: number;
  lng: number;
}

const UbicacionPropiedad: React.FC = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [position, setPosition] = useState<LocationData | null>(null);

  // Función para manejar el click en el mapa y actualizar la posición
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });

    return position === null ? null : <Marker position={position} />;
  }

  // Función para buscar la ubicación usando la API de Nominatim (OpenStreetMap)
  const searchLocation = async () => {
    if (!country || !city) return;

    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          country,
          city,
          format: "json",
          limit: 1,
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error("Error al buscar la ubicación:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ color: "#65348c", mb: 3 }}>
        Ubicación
      </Typography>

      {/* Campos para país y ciudad */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="País"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          required
        />
        <Button variant="contained" onClick={searchLocation} sx={{ ml: 2, backgroundColor: "#65348c" }}>
          Buscar
        </Button>
      </Box>

      {/* Campos para latitud y longitud */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Latitud"
          value={position ? position.lat : ""}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <TextField
          label="Longitud"
          value={position ? position.lng : ""}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Box>

      {/* Mapa para seleccionar ubicación exacta */}
      <MapContainer center={[13.5, -88.2]} zoom={5} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </Box>
  );
};

export default UbicacionPropiedad;
