import React from 'react';
import { Button } from '@/components/ui/button';

interface TecladoProps {
  letrasAdivinadas: Set<string>;
  onLetraClick: (letra: string) => void;
  deshabilitado: boolean;
}

const Teclado: React.FC<TecladoProps> = ({ letrasAdivinadas, onLetraClick, deshabilitado }) => {
  const filas = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const isLetraCorrecta = (letra: string): boolean => {
    const palabraSecreta = document.querySelector('[data-palabra-secreta]')?.textContent?.toLowerCase() || '';
    return palabraSecreta.includes(letra.toLowerCase());
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {filas.map((fila, filaIndex) => (
        <div key={filaIndex} className="flex gap-1 justify-center">
          {fila.map((letra) => {
            const yaAdivinada = letrasAdivinadas.has(letra);
            const esCorrecta = yaAdivinada && isLetraCorrecta(letra);
            
            return (
              <Button
                key={letra}
                variant={yaAdivinada ? "outline" : "secondary"}
                className={`h-12 w-12 text-lg font-medium transition-all ${
                  yaAdivinada 
                    ? esCorrecta 
                      ? 'bg-green-600 text-white hover:bg-green-600' 
                      : 'bg-red-200 text-gray-700 hover:bg-red-200'
                    : 'hover:bg-purple-100'
                }`}
                disabled={yaAdivinada || deshabilitado}
                onClick={() => onLetraClick(letra)}
              >
                {letra}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Teclado;
