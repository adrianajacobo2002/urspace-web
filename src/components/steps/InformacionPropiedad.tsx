import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Chip, Button, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchEtiquetas } from "../../services/etiquetas.service";

interface Etiqueta {
  id_etiqueta: number;
  nombre: string;
}

interface InformacionPropiedadProps {
  setIsStepValid: (isValid: boolean) => void;
  formData: any;
  setFormData: any;
}

const InformacionPropiedad: React.FC<InformacionPropiedadProps> = ({
  setIsStepValid,
  formData,
  setFormData,
}) => {
  const [nombre, setNombre] = useState(formData.informacionPropiedad.nombre || "");
  const [descripcion, setDescripcion] = useState(formData.informacionPropiedad.descripcion || "");
  const [capacidad, setCapacidad] = useState(formData.informacionPropiedad.capacidad || "");
  const [precio, setPrecio] = useState(formData.informacionPropiedad.precio || "");
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState<number[]>(
    formData.informacionPropiedad.etiquetas || []
  );
  const [imagenes, setImagenes] = useState<File[]>(formData.informacionPropiedad.imagenes || []);

  useEffect(() => {
    const cargarEtiquetas = async () => {
      try {
        const etiquetasDesdeAPI = await fetchEtiquetas();
        setEtiquetas(etiquetasDesdeAPI);
      } catch (error) {
        console.error("Error al cargar etiquetas:", error);
      }
    };
    cargarEtiquetas();
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      informacionPropiedad: {
        nombre,
        descripcion,
        capacidad: Number(capacidad),
        precio: Number(precio),
        etiquetas: etiquetasSeleccionadas,
        imagenes,
      },
    });
    setIsStepValid(true);
  }, [nombre, descripcion, capacidad, precio, etiquetasSeleccionadas, imagenes, setFormData, setIsStepValid]);

  const handleEtiquetaClick = (id: number) => {
    setEtiquetasSeleccionadas((prevSeleccionadas) =>
      prevSeleccionadas.includes(id)
        ? prevSeleccionadas.filter((etiquetaId) => etiquetaId !== id)
        : prevSeleccionadas.length < 5
        ? [...prevSeleccionadas, id]
        : prevSeleccionadas
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const nuevasImagenes = [...imagenes, ...Array.from(event.target.files)];
      setImagenes(nuevasImagenes);
    }
  };

  const handleImageDelete = (index: number) => {
    const nuevasImagenes = imagenes.filter((_, i) => i !== index);
    setImagenes(nuevasImagenes);
  };

  const handleNumberInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ color: "#65348c", mb: 3 }}>Déjanos conocer sobre tu propiedad</Typography>
      <TextField
        label="Nombre de la propiedad *"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Descripción de la propiedad *"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        multiline
        rows={3}
        required
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Capacidad *"
          type="text"
          value={capacidad}
          onChange={(e) => handleNumberInput(e.target.value, setCapacidad)}
          fullWidth
          required
        />
        <TextField
          label="Precio *"
          type="text"
          value={precio}
          onChange={(e) => handleNumberInput(e.target.value, setPrecio)}
          fullWidth
          required
        />
      </Box>

      <Box sx={{ textAlign: "left", mt: 4 }}>
        <Typography variant="subtitle1" sx={{ color: "#65348c" }}>Etiquetas</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {etiquetas.map((etiqueta) => (
            <Chip
              key={etiqueta.id_etiqueta}
              label={etiqueta.nombre}
              clickable
              onClick={() => handleEtiquetaClick(etiqueta.id_etiqueta)}
              color={etiquetasSeleccionadas.includes(etiqueta.id_etiqueta) ? "secondary" : "default"}
              sx={{
                backgroundColor: etiquetasSeleccionadas.includes(etiqueta.id_etiqueta) ? "#F0E8FF" : "white",
                color: etiquetasSeleccionadas.includes(etiqueta.id_etiqueta) ? "#65348c" : "black",
                border: etiquetasSeleccionadas.includes(etiqueta.id_etiqueta) ? "1px solid #65348c" : "1px solid grey",
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ textAlign: "left", mt: 4 }}>
        <Typography variant="subtitle1" sx={{ color: "#65348c" }}>Imágenes</Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<AddPhotoAlternateIcon />}
          sx={{ mb: 2, borderColor: "#65348c", color: "#65348c" }}
        >
          Subir
          <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
        </Button>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {imagenes.map((imagen, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <img src={URL.createObjectURL(imagen)} alt={`Preview ${index}`} style={{ width: 100, height: 100, borderRadius: 8 }} />
              <IconButton onClick={() => handleImageDelete(index)} sx={{ position: "absolute", top: -10, right: -10, backgroundColor: "white" }} size="small">
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InformacionPropiedad;
