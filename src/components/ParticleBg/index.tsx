// src/components/ParticlesBackground.tsx
import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const ParticlesBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  // Inicializa las partículas solo una vez
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: { value: "#04172b" },
              position: "50% 50%",
              repeat: "no-repeat",
              size: "20%",
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "remove" },
                onHover: { enable: true, mode: "bubble" },
                resize: {enable: true},
              },
              modes: {
                bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
                repulse: { distance: 400, duration: 0.4 },
              },
            },
            particles: {
              number: {
                value: 200,
                density: { enable: true, value_area: 1102.796376526191 },
              },
              color: { value: "#ffffff" },
              shape: {
                type: "star",
              },
              opacity: {
                value: 1,
                random: true,
                animation: { enable: true, speed: 1, minimumValue: 0, sync: false },
              },
              size: {
                value: { min: 1, max: 2 },
                random: true,
                animation: { enable: false, speed: 4, minimumValue: 0.3, sync: false },
              },
              move: {
                enable: true,
                speed: 1,
                random: true,
                outModes: { default: "out" },
              },
            },
            retina_detect: true,
          }}
        />
      )}
    </>
  );
};

export default ParticlesBackground;
