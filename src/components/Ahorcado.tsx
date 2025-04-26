
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Teclado from '@/components/Teclado';
import Dibujo from '@/components/Dibujo';
import SoundsManager from '@/utils/SoundsManager';
import palabras from '@/utils/palabras';

// Componente principal del juego Ahorcado
const Ahorcado = () => {
  // Estado para controlar el juego
  const [palabraSecreta, setPalabraSecreta] = useState<string>(''); // Palabra a adivinar
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(new Set()); // Letras ya intentadas
  const [intentosRestantes, setIntentosRestantes] = useState<number>(6); // Intentos fallidos permitidos
  const [palabraMostrada, setPalabraMostrada] = useState<string[]>([]); // Palabra mostrada con guiones
  const [estadoJuego, setEstadoJuego] = useState<'jugando' | 'victoria' | 'derrota'>('jugando'); // Estado actual del juego
  const { toast } = useToast();
  
  // Referencia al gestor de sonidos
  const soundsManager = useRef<SoundsManager | null>(null);

  // Inicializar el gestor de sonidos al montar el componente
  useEffect(() => {
    soundsManager.current = new SoundsManager();
    return () => {
      // Limpiar recursos de audio al desmontar
      soundsManager.current?.unload();
    };
  }, []);

  // Inicializar el juego al cargar el componente
  useEffect(() => {
    iniciarJuego();
  }, []);

  // Función para seleccionar una palabra aleatoria e inicializar el juego
  const iniciarJuego = () => {
    // Seleccionar una palabra aleatoria
    const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
    setPalabraSecreta(palabraAleatoria.toUpperCase());
    
    // Reiniciar estados
    setLetrasAdivinadas(new Set());
    setIntentosRestantes(6);
    setEstadoJuego('jugando');
    
    // Inicializar la palabra mostrada con guiones
    setPalabraMostrada(Array(palabraAleatoria.length).fill('_'));
  };

  // Función para manejar cuando se pulsa una letra
  const manejarLetra = (letra: string) => {
    // Si el juego ya terminó o la letra ya fue adivinada, no hacemos nada
    if (estadoJuego !== 'jugando' || letrasAdivinadas.has(letra)) return;

    // Añadir la letra a las letras adivinadas
    const nuevasLetrasAdivinadas = new Set(letrasAdivinadas);
    nuevasLetrasAdivinadas.add(letra);
    setLetrasAdivinadas(nuevasLetrasAdivinadas);

    // Comprobar si la letra está en la palabra
    if (palabraSecreta.includes(letra)) {
      // Actualizar la palabra mostrada
      const nuevaPalabraMostrada = [...palabraMostrada];
      for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
          nuevaPalabraMostrada[i] = letra;
        }
      }
      setPalabraMostrada(nuevaPalabraMostrada);

      // Reproducir sonido de acierto
      soundsManager.current?.playSound('correcto');

      // Comprobar victoria
      if (!nuevaPalabraMostrada.includes('_')) {
        setEstadoJuego('victoria');
        soundsManager.current?.playSound('victoria');
        toast({
          title: "¡Felicidades!",
          description: `Has adivinado la palabra: ${palabraSecreta}`,
          duration: 5000,
        });
      }
    } else {
      // Reproducir sonido de error
      soundsManager.current?.playSound('incorrecto');
      
      // Reducir intentos restantes
      const nuevosIntentosRestantes = intentosRestantes - 1;
      setIntentosRestantes(nuevosIntentosRestantes);

      // Comprobar derrota
      if (nuevosIntentosRestantes === 0) {
        setEstadoJuego('derrota');
        soundsManager.current?.playSound('derrota');
        toast({
          title: "¡Has perdido!",
          description: `La palabra era: ${palabraSecreta}`,
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  };

  // Renderizar el juego
  return (
    <Card className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Juego del Ahorcado</h1>
        <p className="text-gray-600">
          Adivina la palabra letra por letra. ¡Tienes 6 intentos!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Área de dibujo del ahorcado */}
        <div className="flex justify-center items-center">
          <Dibujo intentosFallidos={6 - intentosRestantes} />
        </div>

        <div className="flex flex-col justify-between">
          {/* Palabra a adivinar */}
          <div className="mb-6 text-center">
            <div className="text-3xl font-bold tracking-widest my-4">
              {palabraMostrada.join(' ')}
            </div>
            <p className="text-lg text-gray-700 mt-2">
              Intentos restantes: <span className="font-bold">{intentosRestantes}</span>
            </p>
          </div>

          {/* Teclado virtual */}
          <div className="mb-6">
            <Teclado 
              letrasAdivinadas={letrasAdivinadas} 
              onLetraClick={manejarLetra} 
              deshabilitado={estadoJuego !== 'jugando'} 
            />
          </div>

          {/* Mensajes y botón de reinicio */}
          <div className="text-center">
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
              onClick={iniciarJuego}
            >
              {estadoJuego !== 'jugando' ? 'Jugar de Nuevo' : 'Reiniciar Juego'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Ahorcado;
