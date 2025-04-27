
import React from 'react';

interface MostrarLetraProps {
  letrasElegidas: string[];
  categoria: string;
  intentosRestantes: number;
}

// Componente para mostrar las letras elegidas y el estado actual
const MostrarLetra: React.FC<MostrarLetraProps> = ({
  letrasElegidas,
  categoria,
  intentosRestantes
}) => {
  return (
    <div className="mb-6 text-center">
      <div className="text-3xl font-bold tracking-widest my-4 flex justify-center items-center flex-wrap gap-4">
        {letrasElegidas.map((letra, index) => (
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
    </div>
  );
};

export default MostrarLetra;
