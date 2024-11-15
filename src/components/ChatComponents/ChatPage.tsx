import React, { useState, useEffect } from "react";
import ConversationsList from "./ConversationsList";
import ChatWindow from "./ChatWindow";
import { getUserInfo } from "../../services/conversaciones.service";
import "./ChatPage.css";
import Navbar from "../../layouts/UserNavbar";
import { Box, CircularProgress, Typography } from "@mui/material"; // Importa los componentes necesarios de MUI



interface SelectedConversation {
  id: number; // conversationId
  otherUserName: string;
  otherUserInitials: string;
}

const ChatPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserId(userInfo.id_usuario);
        console.log("ID del usuario logueado:", userInfo.id_usuario);
      } catch (error) {
        console.error("Error al obtener el ID del usuario:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleSelectConversation = (
    conversationId: number,
    otherUserName: string,
    otherUserInitials: string
  ) => {
    setSelectedConversation({
      id: conversationId,
      otherUserName,
      otherUserInitials,
    });
  };

  if (userId === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" marginLeft={2}>Cargando...</Typography>
      </Box>
    );
  }
  

  return (
    <Box
      sx={{
        backgroundColor: "#04172b",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Box display="flex" flex="1" padding={3}>
        <ConversationsList onSelectConversation={handleSelectConversation} />
        {selectedConversation ? (
          <ChatWindow
            conversacionId={selectedConversation.id}
            userId={userId}
            otherUserName={selectedConversation.otherUserName}
            otherUserInitials={selectedConversation.otherUserInitials}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex="1"
            bgcolor="#f0f0f0"
            borderRadius={2}
            margin={2}
          >
            <Typography variant="h6" color="textSecondary">
              Selecciona una conversación para comenzar a chatear
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;