
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TecladoProps {
  letrasAdivinadas: Set<string>;
  onLetraClick: (letra: string) => void;
  deshabilitado: boolean;
  palabraSecreta: string; // Añadiendo la palabra secreta como prop
}

const Teclado: React.FC<TecladoProps> = ({ 
  letrasAdivinadas, 
  onLetraClick, 
  deshabilitado,
  palabraSecreta 
}) => {
  const filas = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const isLetraCorrecta = (letra: string): boolean => {
    if (!palabraSecreta) return false;
    
    const letraNormalizada = letra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const palabraNormalizada = palabraSecreta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    return palabraNormalizada.includes(letraNormalizada);
  };

  // Manejador de eventos del teclado
  const handleKeyPress = (event: KeyboardEvent) => {
    if (deshabilitado) return;
    
    const letra = event.key.toUpperCase();
    const todasLasLetras = filas.flat();
    
    if (todasLasLetras.includes(letra) && !letrasAdivinadas.has(letra)) {
      onLetraClick(letra);
    }
  };

  useEffect(() => {
    // Agregar el event listener cuando el componente se monta
    window.addEventListener('keyup', handleKeyPress);
    
    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [deshabilitado, letrasAdivinadas]); // Re-agregar el listener cuando estas dependencias cambien

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
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-red-200 text-gray-700 hover:bg-red-300'
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
