import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button, Chip, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchEtiquetas } from '../../services/etiquetas.service'; // Importa la función de servicio

interface InformacionPropiedadProps {
  setIsStepValid: (isValid: boolean) => void;
}

const InformacionPropiedad: React.FC<InformacionPropiedadProps> = ({ setIsStepValid }) => {
  const [etiquetas, setEtiquetas] = useState<string[]>([]); // Estado para etiquetas obtenidas de la API
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState<string[]>([]);
  const [imagenes, setImagenes] = useState<File[]>([]);

  // Obtener etiquetas desde el backend al montar el componente
  useEffect(() => {
    const cargarEtiquetas = async () => {
      try {
        const etiquetasDesdeAPI = await fetchEtiquetas();
        setEtiquetas(etiquetasDesdeAPI.map((etiqueta: { nombre: string }) => etiqueta.nombre));
      } catch (error) {
        console.error("Error al cargar etiquetas:", error);
      }
    };
    cargarEtiquetas();
    setIsStepValid(true); // Cambia según la lógica de validación
  }, [setIsStepValid]);

  // Maneja la selección de etiquetas
  const handleEtiquetaClick = (etiqueta: string) => {
    if (etiquetasSeleccionadas.includes(etiqueta)) {
      setEtiquetasSeleccionadas(etiquetasSeleccionadas.filter((e) => e !== etiqueta));
    } else if (etiquetasSeleccionadas.length < 5) {
      setEtiquetasSeleccionadas([...etiquetasSeleccionadas, etiqueta]);
    }
  };

  // Maneja la carga de imágenes
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImagenes([...imagenes, ...Array.from(event.target.files)]);
    }
  };

  // Maneja la eliminación de imágenes
  const handleImageDelete = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ color: "#65348c", mb: 3 }}>
        Déjanos conocer sobre tu propiedad
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre de la propiedad" fullWidth required />
        <TextField label="Descripción de la propiedad" fullWidth multiline rows={3} required />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Capacidad" fullWidth required />
          <TextField label="Precio (por noche si es alquiler)" fullWidth required />
        </Box>

        {/* Sección de Etiquetas */}
        <Box sx={{ textAlign: "left", mt: 4 }}>
          <Typography variant="subtitle1" sx={{ color: "#65348c" }}>
            Etiquetas
          </Typography>
          <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
            Selecciona como máximo 5 etiquetas
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {etiquetas.map((etiqueta) => (
              <Chip
                key={etiqueta}
                label={etiqueta}
                clickable
                onClick={() => handleEtiquetaClick(etiqueta)}
                color={etiquetasSeleccionadas.includes(etiqueta) ? "secondary" : "default"}
                sx={{
                  backgroundColor: etiquetasSeleccionadas.includes(etiqueta) ? "#F0E8FF" : "white",
                  color: etiquetasSeleccionadas.includes(etiqueta) ? "#65348c" : "black",
                  border: etiquetasSeleccionadas.includes(etiqueta) ? "1px solid #65348c" : "1px solid grey",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Sección de Imágenes */}
        <Box sx={{ textAlign: "left", mt: 4 }}>
          <Typography variant="subtitle1" sx={{ color: "#65348c" }}>
            Imágenes
          </Typography>
          <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
            Subir imágenes
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{ mb: 2, borderColor: "#65348c", color: "#65348c" }}
          >
            Subir
            <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
          </Button>

          {/* Visualización de las imágenes seleccionadas */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {imagenes.map((imagen, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img src={URL.createObjectURL(imagen)} alt={`Preview ${index}`} style={{ width: 100, height: 100, borderRadius: 8 }} />
                <IconButton
                  onClick={() => handleImageDelete(index)}
                  sx={{ position: "absolute", top: -10, right: -10, backgroundColor: "white" }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InformacionPropiedad;
