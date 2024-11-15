// src/components/ReviewModal.tsx
import React, { useState } from "react";
import { Box, Modal, Typography, TextField, Button, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { createValoracion } from "../../services/valoraciones.service"; // Importa el servicio para crear valoración


interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
  terrenoId: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, handleClose, terrenoId }) => {
  const [rating, setRating] = useState(1); // Valor inicial de calificación (4 estrellas)
  const [review, setReview] = useState("");

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleAddReview = async () => {
    console.log("Enviando valoración con los siguientes datos:", {
      calificacion: rating,
      comentario: review,
      terreno_id: terrenoId,
    });

    try {
      await createValoracion({
        calificacion: rating,
        comentario: review,
        terreno_id: terrenoId,
      });
      console.log("Valoración creada exitosamente");
      handleClose(); // Cierra el modal después de agregar la reseña
    } catch (error) {
      console.error("Error al agregar la valoración:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#6B3FA0",
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Escribe una reseña
        </Typography>
        
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          placeholder="Escribe tu reseña aquí..."
          sx={{
            bgcolor: "#f0f0f0",
            borderRadius: 2,
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            Calificanos
          </Typography>
          {[...Array(5)].map((_, index) => (
            <IconButton
              key={index}
              onClick={() => handleStarClick(index)}
              sx={{ color: index < rating ? "#ffb400" : "#f0f0f0" }}
            >
              <StarIcon />
            </IconButton>
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={handleAddReview}
          sx={{
            backgroundColor: "#f0f0f0",
            color: "#6B3FA0",
            fontWeight: "bold",
            borderRadius: 2,
            width: "100px",
            alignSelf: "flex-end",
          }}
        >
          Agregar
        </Button>
      </Box>
    </Modal>
  );
};

export default ReviewModal;