import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MiniCardGroup from "../../CountCard/MiniCardGroup";
import PropertyCard from "../../PropertyCard";
import { getPropertiesByCurrentUser } from "../../../services/terrenos.service";

interface Property {
  id: number;
  images: string[];
  title: string;
  property: string;
  price: string;
  type: string;
}

const PropertiesTab: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [activeFilter, setActiveFilter] = useState("Todas");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getPropertiesByCurrentUser();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const handleFilterChange = (type: string) => {
    setActiveFilter(type);

    if (type === "Todas") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter((property) => property.type === type);
      setFilteredProperties(filtered);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <MiniCardGroup
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter}
          propertyCounts={{
            Todas: properties.length,
            Alquiler: properties.filter((p) => p.type === "Alquiler").length,
            Venta: properties.filter((p) => p.type === "Venta").length,
          }}
        />
        <IconButton
          sx={{
            backgroundColor: "#65348c",
            color: "#fff",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#4e278c",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Box display="flex" gap={2} flexWrap="wrap">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            images={property.images}
            title={property.title}
            property={property.property}
            price={property.price}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PropertiesTab;
