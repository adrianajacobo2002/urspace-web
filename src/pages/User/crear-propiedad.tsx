// src/pages/crear-propiedad.tsx
import React, { useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel, Button, Card, CardContent, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MapIcon from "@mui/icons-material/Map";
import ParticlesBackground from "../../components/ParticleBg";
import Navbar from "../../layouts/UserNavbar";
import TipoPropiedad from "../../components/steps/TipoPropiedad";
import InformacionPropiedad from "../../components/steps/InformacionPropiedad";
import UbicacionPropiedad from "../../components/steps/UbicacionPropiedad";
import ResumenDatos from "../../components/ResumenDatos";
import { createTerreno } from "../../services/terrenos.service";
import { StepIconProps } from "@mui/material/StepIcon";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: { backgroundImage: "linear-gradient(95deg, #6a1b9a 0%, #8e24aa 50%, #ab47bc 100%)" },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { backgroundImage: "linear-gradient(95deg, #6a1b9a 0%, #8e24aa 50%, #ab47bc 100%)" },
  },
  [`& .${stepConnectorClasses.line}`]: { height: 3, border: 0, backgroundColor: "#eaeaf0", borderRadius: 1 },
}));

const ColorlibStepIconRoot = styled("div")<{ ownerState: { completed?: boolean; active?: boolean } }>(({ ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && { backgroundImage: "linear-gradient(136deg, #6a1b9a 0%, #8e24aa 50%, #ab47bc 100%)", boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)" }),
  ...(ownerState.completed && { backgroundImage: "linear-gradient(136deg, #6a1b9a 0%, #8e24aa 50%, #ab47bc 100%)" }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;
  const icons: { [index: number]: React.ReactElement } = { 1: <SettingsIcon />, 2: <GroupAddIcon />, 3: <MapIcon /> };
  return <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>{icons[Number(icon)]}</ColorlibStepIconRoot>;
}

const steps = ["Tipo de propiedad", "Información de la propiedad", "Ubicación"];

const CrearPropiedad: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isStepValid, setIsStepValid] = useState(false);

  const [formData, setFormData] = useState({
    tipoPropiedad: '',
    informacionPropiedad: { nombre: '', descripcion: '', capacidad: 0, precio: 0, etiquetas: [], imagenes: [] },
    ubicacionPropiedad: { pais: '', ciudad: '', latitud: null, longitud: null },
  });

  const handleNext = () => {
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
      setIsStepValid(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCreateProperty = async () => {
    try {
      const etiquetaIds = (formData.informacionPropiedad.etiquetas as Array<{ id: number; nombre: string }> | string[])
        .map((etiqueta) =>
          typeof etiqueta === "object" && etiqueta !== null ? etiqueta.id : etiqueta
        )
        .filter((id) => id !== undefined)
        .map((id) => Number(id)); // Convertimos todos los elementos a número
  
      console.log("Iniciando creación de propiedad con los siguientes datos:", formData);
      console.log("IDs de las etiquetas que se enviarán:", etiquetaIds);
  
      const response = await createTerreno({
        nombre: formData.informacionPropiedad.nombre,
        ubicacion: `${formData.ubicacionPropiedad.pais}, ${formData.ubicacionPropiedad.ciudad}`,
        latitud: formData.ubicacionPropiedad.latitud ?? undefined,
        longitud: formData.ubicacionPropiedad.longitud ?? undefined,
        capacidad: formData.informacionPropiedad.capacidad,
        precio: formData.informacionPropiedad.precio,
        tipo_terreno: formData.tipoPropiedad,
        descripcion: formData.informacionPropiedad.descripcion,
        imagenes: formData.informacionPropiedad.imagenes,
        etiquetas: etiquetaIds, // Ahora este array solo contiene números
      });
  
      if (response) {
        alert("Propiedad creada con éxito");
      }
    } catch (error) {
      console.error("Error al crear la propiedad:", error);
      alert("Error al crear la propiedad");
    }
  };
  
  

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <TipoPropiedad selectedOption={selectedOption} setSelectedOption={setSelectedOption} setIsStepValid={setIsStepValid} formData={formData} setFormData={setFormData} />;
      case 1:
        return <InformacionPropiedad setIsStepValid={setIsStepValid} formData={formData} setFormData={setFormData} />;
      case 2:
        return <UbicacionPropiedad setIsStepValid={setIsStepValid} formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ backgroundColor: "#04172b", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Navbar />
      <ParticlesBackground />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", paddingTop: 5 }}>
        <Card sx={{ width: { xs: "90%", sm: "60%" }, borderRadius: 3, boxShadow: 3, zIndex: 2, position: "relative" }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ color: "#65348c", mb: 2 }}>Agregar propiedad</Typography>
            <Stack sx={{ width: "100%" }} spacing={4}>
              <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => <Step key={label}><StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel></Step>)}
              </Stepper>
            </Stack>
            <Box sx={{ mt: 3 }}>
              {activeStep === steps.length ? (
                <>
                  <ResumenDatos formData={formData} />
                  <Button variant="contained" onClick={handleCreateProperty} sx={{ backgroundColor: "#65348c", color: "#fff", mt: 4 }}>
                    Crear Propiedad
                  </Button>
                </>
              ) : (
                <Box>
                  {renderStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack} sx={{ color: "#65348c" }}>Anterior</Button>
                    <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: "#65348c", color: "#fff", "&:hover": { backgroundColor: "#4e278c" } }}>
                      {activeStep === steps.length - 1 ? "Crear" : "Siguiente"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CrearPropiedad;
