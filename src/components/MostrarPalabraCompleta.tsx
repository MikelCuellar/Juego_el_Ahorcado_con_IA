
import React from 'react';
import MostrarLetra from './MostrarLetra';
import MensajesDeError from './MensajesDeError';
import { EstadoJuego } from '@/models/AhorcadoTypes';

interface MostrarPalabraCompletaProps {
  palabraMostrada: string[];
  categoria: string;
  intentosRestantes: number;
  estadoJuego: EstadoJuego;
  palabraSecreta: string;
  onReiniciar: () => void;
  isLoading: boolean;
}

// Componente que muestra la palabra completa y el estado del juego
const MostrarPalabraCompleta: React.FC<MostrarPalabraCompletaProps> = ({
  palabraMostrada,
  categoria,
  intentosRestantes,
  estadoJuego,
  palabraSecreta,
  onReiniciar,
  isLoading
}) => {
  return (
    <div className="flex flex-col">
      <MostrarLetra 
        letrasElegidas={palabraMostrada}
        categoria={categoria}
        intentosRestantes={intentosRestantes}
      />
      
      <MensajesDeError
        estadoJuego={estadoJuego}
        palabraSecreta={palabraSecreta}
        onReiniciar={onReiniciar}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MostrarPalabraCompleta;
