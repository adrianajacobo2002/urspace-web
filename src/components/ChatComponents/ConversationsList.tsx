import React, { useEffect, useState } from "react";
import { getConversacionesByUsuario } from "../../services/conversaciones.service";
import "./ConversationsList.css";

interface Conversation {
  id_conversacion: number;
  fecha_inicio: string;
  otro_usuario_id: number;
  otro_usuario_nombres: string;
  otro_usuario_apellidos: string;
  ultimo_mensaje: string;
}

interface ConversationsListProps {
    onSelectConversation: (conversationId: number, otherUserName: string, otherUserInitials: string) => void;
  }
  
  const ConversationsList: React.FC<ConversationsListProps> = ({ onSelectConversation }) => {
    const [conversaciones, setConversaciones] = useState<Conversation[]>([]);
  
    useEffect(() => {
      const fetchConversaciones = async () => {
        const data = await getConversacionesByUsuario();
        setConversaciones(data);
      };
      fetchConversaciones();
    }, []);
  
    return (
      <div className="conversations-list">
        <h3>Bandeja de entrada</h3>
        {conversaciones.length > 0 ? (
          conversaciones.map((conv) => (
            <div
              key={conv.id_conversacion}
              className="conversation-item"
              onClick={() =>
                onSelectConversation(
                  conv.id_conversacion,
                  `${conv.otro_usuario_nombres} ${conv.otro_usuario_apellidos}`,
                  `${conv.otro_usuario_nombres.charAt(0)}${conv.otro_usuario_apellidos.charAt(0)}`.toUpperCase()
                )
              }
            >
              <div className="avatar">
                {conv.otro_usuario_nombres.charAt(0)}
                {conv.otro_usuario_apellidos.charAt(0)}
              </div>
              <div>
                <strong>{`${conv.otro_usuario_nombres} ${conv.otro_usuario_apellidos}`}</strong>
                <p>{conv.ultimo_mensaje}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes conversaciones</p>
        )}
      </div>
    );
  };
  
  export default ConversationsList;