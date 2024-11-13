import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchCountries } from "../../services/country.service";
import { fetchCities } from "../../services/city.service";
import { debounce } from "lodash"; // Debes instalar lodash: npm install lodash

interface OptionType {
  label: string;
  value: string;
}

interface LocationSearchProps {
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onCountryChange, onCityChange }) => {
  const [countries, setCountries] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(null);
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };

    loadCountries();
  }, []);

  const debouncedFetchCities = React.useCallback(
    debounce(async (countryCode: string, query: string) => {
      if (countryCode) {
        try {
          const citiesData = await fetchCities(countryCode, query);
          setCities(citiesData);
        } catch (error) {
          console.error("Error al cargar ciudades:", error);
        }
      }
    }, 300),
    []
  );

  const handleCountryChange = async (selectedOption: OptionType | null) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null);
    if (selectedOption) {
      debouncedFetchCities(selectedOption.value, "");
      onCountryChange(selectedOption.label); // Envía el país seleccionado a FilterModal
    } else {
      onCountryChange("");
    }
  };

  const handleCityInputChange = (inputValue: string) => {
    if (selectedCountry) {
      debouncedFetchCities(selectedCountry.value, inputValue);
    }
  };

  const handleCityChange = (selectedOption: OptionType | null) => {
    setSelectedCity(selectedOption);
    if (selectedOption) {
      onCityChange(selectedOption.label); // Envía la ciudad seleccionada a FilterModal
    } else {
      onCityChange("");
    }
  };

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div style={{ width: "250px" }}>
        <label>Destino</label>
        <Select
          options={countries}
          placeholder="Selecciona un país"
          onChange={handleCountryChange}
          value={selectedCountry}
        />
      </div>
      <div style={{ width: "250px" }}>
        <label>Ciudad</label>
        <Select
          options={cities}
          placeholder="Selecciona una ciudad"
          onInputChange={handleCityInputChange}
          isDisabled={!selectedCountry}
          value={selectedCity}
          onChange={handleCityChange}
        />
      </div>
    </div>
  );
};

export default LocationSearch;
