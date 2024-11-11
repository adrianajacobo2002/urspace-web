// src/layouts/LoggedNavbar.tsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AvatarWithInitials from "../../components/Avatar";
import { getUserInfo } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
}

const LoggedNavbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUser({
          firstName: response.nombres.split(" ")[0],
          lastName: response.apellidos.split(" ")[0],
        });
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleMenuClose();
    navigate("/profile"); // Navega a la página de perfil
  };

  const handleOwnerMode = () => {
    handleMenuClose();
    navigate("/owner-mode"); // Navega a la página de modo propietario
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token"); // Elimina el token de autenticación
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#04172b" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          UrSpace
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component={RouterLink}
            to="/navegar" // Cambia a la ruta correspondiente
            sx={{
              marginRight: "50px",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Navegar
          </Typography>{" "}
          <Typography
            component={RouterLink}
            to="/publicar" // Cambia a la ruta correspondiente
            sx={{
              marginRight: "50px",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Crear Propiedad
          </Typography>
          <IconButton color="inherit" sx={{ marginRight: "50px" }}>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ marginRight: "50px" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            {user && (
              <AvatarWithInitials
                firstName={user.firstName}
                lastName={user.lastName}
                hasMenu={true}
              />
            )}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem sx={{ color: "black" }} onClick={handleViewProfile}>
              Ver perfil
            </MenuItem>
            <MenuItem sx={{ color: "black" }} onClick={handleOwnerMode}>
              Modo propietario
            </MenuItem>
            <MenuItem sx={{ color: "black" }} onClick={handleLogout}>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoggedNavbar;
