// PropertyCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTerreno } from "../../services/terrenos.service";

interface PropertyCardProps {
  id: number;
  images: string[];
  title: string;
  property: string;
  price: string;
  onDelete: (id: number) => void; // Callback para manejar la eliminación
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  images,
  title,
  property,
  price,
  onDelete,
}) => {
  const navigate = useNavigate();
  const imageUrl = images.length > 0 ? images[0] : "https://via.placeholder.com/300x140";

  const handleEdit = () => {
    navigate(`/edit/${id}`); // Redirigir al formulario de edición
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTerreno(id);
          Swal.fire("Eliminado", "La propiedad ha sido eliminada con éxito.", "success");
          onDelete(id); // Llamar al callback para actualizar la lista en PropertiesTab
        } catch (error) {
          console.error("Error al eliminar la propiedad:", error);
          Swal.fire("Error", "Hubo un problema al eliminar la propiedad.", "error");
        }
      }
    });
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, width: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{
          objectFit: "cover",
          width: "100%",
        }}
      />
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              color: "black",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "170px",
            }}
          >
            {title}
          </Typography>
          <Box>
            <IconButton
              sx={{ color: "#65348c" }}
              onClick={handleEdit} // Redirige al formulario de edición
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#65348c" }}
              onClick={handleDelete} // Maneja la eliminación
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {property}
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="secondary">
          {price}
        </Typography>
      </Box>
    </Card>
  );
};

export default PropertyCard;
