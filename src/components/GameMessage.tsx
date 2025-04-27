
import React from 'react';
import { Button } from '@/components/ui/button';
import { EstadoJuego } from '@/models/AhorcadoTypes';

interface GameMessageProps {
  estadoJuego: EstadoJuego;
  palabraSecreta: string;
  onReiniciar: () => void;
  isLoading: boolean;
}

const GameMessage: React.FC<GameMessageProps> = ({
  estadoJuego,
  palabraSecreta,
  onReiniciar,
  isLoading
}) => {
  const getMessage = () => {
    switch (estadoJuego) {
      case 'victoria':
        return (
          <div className="p-2 bg-green-100 text-green-800 rounded-md text-sm mb-5">
            ¡Felicidades! Palabra: <strong>{palabraSecreta}</strong>
          </div>
        );
      case 'derrota':
        return (
          <div className="p-2 bg-red-100 text-red-800 rounded-md text-sm mb-5">
            ¡Perdiste! Palabra: <strong>{palabraSecreta}</strong>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {getMessage()}
      <Button 
        variant="default"
        size="sm"
        className="bg-purple-500 hover:bg-purple-600"
        onClick={onReiniciar}
        disabled={isLoading}
      >
        {isLoading ? 'Cargando...' : 'Iniciar Juego'}
      </Button>
    </div>
  );
};

export default GameMessage;
