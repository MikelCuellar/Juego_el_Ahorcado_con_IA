
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Teclado from '@/components/Teclado';
import Dibujo from '@/components/Dibujo';
import CategorySelector from '@/components/CategorySelector';
import GameStatus from '@/components/GameStatus';
import { useAhorcadoGame } from '@/hooks/useAhorcadoGame';
import { useAhorcadoSounds } from '@/hooks/useAhorcadoSounds';

const Ahorcado = () => {
  const {
    palabraSecreta,
    letrasAdivinadas,
    intentosRestantes,
    palabraMostrada,
    estadoJuego,
    isLoading,
    categoria,
    setCategoria,
    fetchPalabraSecreta,
    manejarLetra
  } = useAhorcadoGame();

  const { isMuted, soundsManager, toggleMute } = useAhorcadoSounds();

  return (
    <Card className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-2xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Juego del Ahorcado</h1>
        <p className="text-gray-600">
          Adivina la palabra letra por letra. Tienes {intentosRestantes} intentos.
        </p>
        <div className="flex justify-center gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleMute} 
          >
            {isMuted ? '🔇 Activar Sonido' : '🔊 Silenciar'}
          </Button>
        </div>
      </div>

      <CategorySelector
        selectedCategory={categoria}
        onSelect={setCategoria}
        disabled={isLoading || estadoJuego !== 'jugando'}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <Dibujo intentosFallidos={palabraSecreta.length > 0 ? (palabraSecreta.length - intentosRestantes) : 0} />
        </div>

        <div className="flex flex-col justify-between">
          <GameStatus 
            palabraMostrada={palabraMostrada}
            categoria={categoria}
            intentosRestantes={intentosRestantes}
            estadoJuego={estadoJuego}
            palabraSecreta={palabraSecreta}
            onReiniciar={fetchPalabraSecreta}
            isLoading={isLoading}
          />

          <div className="mb-6">
            <Teclado 
              letrasAdivinadas={letrasAdivinadas} 
              onLetraClick={(letra) => manejarLetra(letra, soundsManager)}
              deshabilitado={isLoading || estadoJuego !== 'jugando'} 
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Ahorcado;
