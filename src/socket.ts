import { io, Socket } from "socket.io-client";
import { getUserInfo } from "./services/users.service";

const SOCKET_URL = "http://localhost:3000";
const socket: Socket = io(SOCKET_URL, { autoConnect: false });

// Definir la interfaz para el tipo de mensaje
export interface Message {
  conversacion_id: number;
  usuario_remitente_id: number;
  mensaje: string;
}

// Conectar el socket y registrar al usuario
export const connectSocket = async () => {
  try {
    const userInfo = await getUserInfo();
    const userId = userInfo.id_usuario;

    if (!socket.connected) {
      socket.connect();
      socket.emit("registerUser", userId);
    }
  } catch (error) {
    console.error("Error al conectar el socket:", error);
    throw new Error("Usuario no autenticado. Inicia sesión para acceder al chat.");
  }
};

// Unirse a una sala de conversación
export const joinRoom = (conversacionId: number) => {
  socket.emit("joinRoom", conversacionId);
};

// Enviar mensaje
export const sendMessage = (conversacionId: number, mensaje: string, userId: number) => {
  const messageData = { conversacionId, userId, mensaje };
  socket.emit("sendMessage", messageData);
};

// Escuchar mensajes recibidos
export const onMessageReceived = (callback: (message: Message) => void) => {
  socket.on("receiveMessage", callback);
};

export default socket;
