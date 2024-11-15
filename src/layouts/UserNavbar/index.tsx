import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AvatarWithInitials from "../../components/Avatar";
import { getUserInfo } from "../../services/users.service";
import { getNotificacionesByUsuario } from "../../services/notificacion.service";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
}

const LoggedNavbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0); // Estado para el contador de no leídas
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUser({
          firstName: response.nombres.split(" ")[0],
          lastName: response.apellidos.split(" ")[0],
        });
        
        // Llamada para obtener las notificaciones no leídas
        const notificaciones = await getNotificacionesByUsuario(response.id_usuario);
        const unreadNotifications = notificaciones.filter((notif: any) => !notif.leido).length;
        setUnreadCount(unreadNotifications);
      } catch (error) {
        console.error("Error al obtener la información del usuario o las notificaciones:", error);
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
    navigate("/profile");
  };

  const handleOwnerMode = () => {
    handleMenuClose();
    navigate("/owner-mode");
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleNotificationClick = () => {
    navigate("/notificaciones");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#04172b" }}>
      <Toolbar>
        <Typography component={RouterLink}
            to="/dashboard" variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: 'inherit', textDecoration: "none" }}>
          UrSpace
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component={RouterLink}
            to="/navegar"
            sx={{
              marginRight: "50px",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Navegar
          </Typography>
          
          <IconButton color="inherit" sx={{ marginRight: "50px" }} onClick={handleChatClick}>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ marginRight: "50px" }} onClick={handleNotificationClick}>
            <Badge badgeContent={unreadCount} color="secondary">
              <NotificationsIcon />
            </Badge>
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
