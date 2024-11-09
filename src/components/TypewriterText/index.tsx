// src/components/TypewriterText.tsx
import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TypewriterText: React.FC = () => {
  const [text] = useTypewriter({
    words: ["Comprar Propiedades", "Alquilar Propiedades"],
    loop: 0, // 0 = loop infinito
    delaySpeed: 2000, // Tiempo de espera antes de cambiar a la siguiente palabra
    typeSpeed: 70, // Velocidad de escritura
    deleteSpeed: 50, // Velocidad de borrado
  });

  return (
    <span>
      {text}
      <Cursor cursorStyle="|" />
    </span>
  );
};

export default TypewriterText;
