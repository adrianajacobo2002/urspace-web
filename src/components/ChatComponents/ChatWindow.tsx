import React, { useState, useEffect } from "react";
import socket from "../../socket";
import "./ChatWindow.css";

interface Message {
  id_mensaje: number;
  usuario_remitente_id: number;
  mensaje: string;
}

interface ChatWindowProps {
  conversacionId: number;
  userId: number; // ID of the logged-in user
  otherUserName: string; // Name of the other user in the conversation
  otherUserInitials: string; // Initials of the other user
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversacionId, userId, otherUserName, otherUserInitials }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("joinRoom", conversacionId);

    fetch(`http://localhost:3000/api/mensajes/conversacion/${conversacionId}`)
      .then((res) => res.json())
      .then((data) => setMensajes(data));

    socket.on("receiveMessage", (nuevoMensaje: Message) => {
      setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [conversacionId]);

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      const nuevoMensaje = {
        conversacionId,
        usuarioRemitenteId: userId,
        mensaje,
      };
      socket.emit("sendMessage", nuevoMensaje);
      setMensaje("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="avatar">{otherUserInitials}</div>
        <strong style={{ color: "black" }}>{otherUserName}</strong>
      </div>
      <div className="chat-messages">
        {mensajes.map((msg) => (
          <div
            key={msg.id_mensaje}
            className={`message ${msg.usuario_remitente_id === userId ? "sent" : "received"}`}
          >
            {msg.mensaje}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={enviarMensaje}>
          <i className="send-icon">➤</i>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;