import React, { useState, useEffect } from "react";
import ConversationsList from "./ConversationsList";
import ChatWindow from "./ChatWindow";
import { getUserInfo } from "../../services/conversaciones.service";
import "./ChatPage.css";

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
    return <p>Cargando...</p>; // Mostrar indicador de carga
  }

  return (
    <div className="chat-page">
      <ConversationsList onSelectConversation={handleSelectConversation} />
      {selectedConversation && (
        <ChatWindow
          conversacionId={selectedConversation.id}
          userId={userId}
          otherUserName={selectedConversation.otherUserName}
          otherUserInitials={selectedConversation.otherUserInitials}
        />
      )}
    </div>
  );
};

export default ChatPage;