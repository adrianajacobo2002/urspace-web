// src/services/cityService.ts
import axios from "axios";

const GEODB_CITIES_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const GEODB_API_KEY = "daeae72ffemsh67157f9d7611c7fp13b5b7jsn61d6d34f4254"; // Reemplaza esto con tu API key

export const fetchCities = async (countryCode: string, query: string) => {
  try {
    const response = await axios.get(GEODB_CITIES_API_URL, {
      params: {
        countryIds: countryCode,
        namePrefix: query,
        limit: 5, // Número de resultados
        languageCode: "es", // Idioma en español
      },
      headers: {
        "X-RapidAPI-Key": GEODB_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    });

    return response.data.data.map((city: any) => ({
      label: city.name,
      value: city.id,
    }));
  } catch (error) {
    console.error("Error al obtener las ciudades:", error);
    throw error;
  }
};
