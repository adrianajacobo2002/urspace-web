// src/components/ReviewModal.tsx
import React, { useState } from "react";
import { Box, Modal, Typography, TextField, Button, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, handleClose }) => {
  const [rating, setRating] = useState(4); // Valor inicial de calificación (4 estrellas)
  const [review, setReview] = useState("");

  const handleStarClick = (index: number) => {
    setRating(index + 1);
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
          onClick={handleClose}
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