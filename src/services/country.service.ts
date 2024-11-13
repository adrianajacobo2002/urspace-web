// src/services/countryService.ts
import axios from "axios";

const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/all";

export const fetchCountries = async () => {
  try {
    const response = await axios.get(REST_COUNTRIES_URL);
    // Filtra y mapea los datos para obtener solo los nombres de países en español
    return response.data.map((country: any) => ({
      label: country.translations.spa.common, // Nombre en español
      value: country.cca2, // Código del país
    }));
  } catch (error) {
    console.error("Error al obtener los países:", error);
    throw error;
  }
};
