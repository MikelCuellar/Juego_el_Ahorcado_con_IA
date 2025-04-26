
import React from 'react';
import { Button } from '@/components/ui/button';

// Definición de las propiedades del componente Teclado
interface TecladoProps {
  letrasAdivinadas: Set<string>; // Conjunto de letras ya intentadas
  onLetraClick: (letra: string) => void; // Función para manejar click en letra
  deshabilitado: boolean; // Indica si todo el teclado debe estar deshabilitado
}

// Componente para el teclado virtual
const Teclado: React.FC<TecladoProps> = ({ letrasAdivinadas, onLetraClick, deshabilitado }) => {
  // Definición del alfabeto español (sin Ñ para simplificar)
  const filas = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {filas.map((fila, filaIndex) => (
        <div key={filaIndex} className="flex gap-1 justify-center">
          {fila.map((letra) => {
            // Determinar si la letra ya ha sido adivinada
            const yaAdivinada = letrasAdivinadas.has(letra);
            
            return (
              <Button
                key={letra}
                variant={yaAdivinada ? "outline" : "secondary"}
                className={`h-12 w-12 text-lg font-medium transition-all ${
                  yaAdivinada ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-100'
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
