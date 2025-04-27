
import React from 'react';
import { Button } from '@/components/ui/button';
import { EstadoJuego } from '@/models/AhorcadoTypes';

interface MensajesDeErrorProps {
  estadoJuego: EstadoJuego;
  palabraSecreta: string;
  onReiniciar: () => void;
  isLoading: boolean;
}

// Componente para mostrar mensajes de error y estado del juego
const MensajesDeError: React.FC<MensajesDeErrorProps> = ({
  estadoJuego,
  palabraSecreta,
  onReiniciar,
  isLoading
}) => {
  return (
    <>
      {estadoJuego === 'victoria' && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          ¡Felicidades! Has ganado. La palabra era: <strong>{palabraSecreta}</strong>
        </div>
      )}
      
      {estadoJuego === 'derrota' && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          ¡Has perdido! La palabra era: <strong>{palabraSecreta}</strong>
        </div>
      )}
      
      <Button 
        variant="default" 
        size="lg" 
        className="mt-2 bg-purple-500 hover:bg-purple-600" 
        onClick={onReiniciar}
        disabled={isLoading}
      >
        {isLoading ? 'Cargando...' : estadoJuego !== 'jugando' ? 'Iniciar Juego' : 'Iniciar Juego'}
      </Button>
    </>
  );
};

export default MensajesDeError;
