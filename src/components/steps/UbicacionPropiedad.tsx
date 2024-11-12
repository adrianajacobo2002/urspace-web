// src/components/steps/UbicacionPropiedad.tsx
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";

interface UbicacionPropiedadProps {
  setIsStepValid: (isValid: boolean) => void;
  formData: any;
  setFormData: any;
}

interface LocationData {
  lat: number;
  lng: number;
}

const UbicacionPropiedad: React.FC<UbicacionPropiedadProps> = ({ setIsStepValid, formData, setFormData }) => {
  const [country, setCountry] = useState(formData.ubicacionPropiedad.pais || "");
  const [city, setCity] = useState(formData.ubicacionPropiedad.ciudad || "");
  const [position, setPosition] = useState<LocationData | null>({
    lat: formData.ubicacionPropiedad.latitud || 13.5,
    lng: formData.ubicacionPropiedad.longitud || -88.2,
  });

  useEffect(() => {
    // Almacena la ubicación en formData
    setFormData({
      ...formData,
      ubicacionPropiedad: {
        pais: country,
        ciudad: city,
        latitud: position ? position.lat : null,
        longitud: position ? position.lng : null,
      },
    });
    setIsStepValid(!!country && !!city && !!position); // Marca el paso como válido si hay datos completos
  }, [country, city, position, setFormData, setIsStepValid]);

  // Maneja el click en el mapa y actualiza la posición
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
      <Typography variant="h6" sx={{ color: "#65348c", mb: 3 }}>Ubicación</Typography>
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
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Latitud"
          value={position ? position.lat : ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Longitud"
          value={position ? position.lng : ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Box>
      <MapContainer center={[13.5, -88.2]} zoom={5} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <LocationMarker />
      </MapContainer>
    </Box>
  );
};

export default UbicacionPropiedad;
