
import React from 'react';

interface GameStatusProps {
  palabraMostrada: string[];
  categoria: string;
  intentosRestantes: number;
  estadoJuego: 'jugando' | 'victoria' | 'derrota';
  palabraSecreta: string;
  onReiniciar: () => void;
  isLoading: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({
  palabraMostrada,
  categoria,
  intentosRestantes,
  estadoJuego,
  palabraSecreta,
}) => {
  return (
    <div className="mb-6 text-center">
      <div className="text-3xl font-bold tracking-widest my-4 flex justify-center items-center flex-wrap gap-4">
        {palabraMostrada.map((letra, index) => (
          <span 
            key={index} 
            className="w-12 h-14 border-b-4 border-gray-400 flex items-center justify-center text-center"
          >
            {letra}
          </span>
        ))}
      </div>
      <p className="text-lg text-gray-700 mt-2">
        Categoría: <span className="font-bold capitalize">{categoria}</span>
      </p>
      <p className="text-lg text-gray-700 mt-2">
        Intentos restantes: <span className="font-bold">{intentosRestantes}</span>
      </p>

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
    </div>
  );
};

export default GameStatus;
