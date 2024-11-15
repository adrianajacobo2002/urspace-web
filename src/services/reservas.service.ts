import axios from "axios";
const API_URL = "http://localhost:3000/api"; // Cambia esta URL según tu configuración

export const createReserva = async (reservaData: {
    fecha_inicio: Date;
    fecha_fin: Date;
    impuestos: number;
    subtotal: number;
    precio_total: number;
    terreno_id: number;
    id_usuario: number;
  }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Usuario no autenticado");
    }
  
    try {
      const response = await axios.post(`${API_URL}/reservas`, reservaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      throw error;
    }
  };

export const getFechasReservadasByPropiedad = async (id_terreno: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Usuario no autenticado");
    }
  
    try {
      const response = await axios.get(`${API_URL}/reservas/propiedad/${id_terreno}/fechas-reservadas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const fechasReservadas = response.data.fechasReservadas || [];
      console.log("Respuesta del endpoint de fechas reservadas:", fechasReservadas);
  
      // Mapea las fechas para asegurarse de tener un array de Date
      const allReservedDates = [];
      fechasReservadas.forEach(({ startDate, endDate }: { startDate: string; endDate: string }) => {
        let currentDate = new Date(startDate);
        const end = new Date(endDate);
  
        while (currentDate <= end) {
          allReservedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1); // Avanza al siguiente día
        }
      });
  
      return allReservedDates;
    } catch (error) {
      console.error("Error al obtener fechas reservadas:", error);
      throw error;
    }
  };
  
