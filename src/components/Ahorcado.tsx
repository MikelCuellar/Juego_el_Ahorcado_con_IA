
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Teclado from '@/components/Teclado';
import Dibujo from '@/components/Dibujo';
import SoundsManager from '@/utils/SoundsManager';
import CategorySelector from '@/components/CategorySelector';
import { getRandomWordByCategory } from '@/utils/WordService';

const Ahorcado = () => {
  const [palabraSecreta, setPalabraSecreta] = useState<string>(''); // Palabra a adivinar
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(new Set()); // Letras ya intentadas
  const [intentosRestantes, setIntentosRestantes] = useState<number>(6); // Intentos fallidos permitidos
  const [palabraMostrada, setPalabraMostrada] = useState<string[]>([]); // Palabra mostrada con guiones
  const [estadoJuego, setEstadoJuego] = useState<'jugando' | 'victoria' | 'derrota'>('jugando'); // Estado actual del juego
  const [isMuted, setIsMuted] = useState<boolean>(false); // Estado de silencio
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [categoria, setCategoria] = useState<string>("animales"); // Categoría seleccionada
  
  const {
    toast
  } = useToast();
  const soundsManager = useRef<SoundsManager | null>(null);
  
  // Efecto para inicializar el gestor de sonidos
  useEffect(() => {
    console.log("Inicializando gestor de sonidos...");
    soundsManager.current = new SoundsManager();
    
    // Iniciar música después de un corto retraso para asegurar que el contexto de audio esté listo
    setTimeout(() => {
      console.log("Intentando reproducir música de fondo...");
      soundsManager.current?.startBackgroundMusic();
    }, 1000);
    
    return () => {
      console.log("Limpiando gestor de sonidos...");
      soundsManager.current?.stopBackgroundMusic();
      soundsManager.current?.unload();
    };
  }, []);
  
  // Fetch word when category changes or game restarts
  const fetchPalabraSecreta = async () => {
    setIsLoading(true);
    try {
      const palabra = await getRandomWordByCategory(categoria);
      setPalabraSecreta(palabra);
      setIntentosRestantes(Math.min(palabra.length, 12)); // Set attempts to word length, max 12
      setPalabraMostrada(Array(palabra.length).fill('_'));
      setLetrasAdivinadas(new Set());
      setEstadoJuego('jugando');
    } catch (error) {
      console.error("Error fetching word:", error);
      toast({
        title: "Error",
        description: "Error al obtener palabra. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Efecto para iniciar el juego al cargar o cambiar categoría
  useEffect(() => {
    if (categoria) {
      fetchPalabraSecreta();
    }
  }, [categoria]);
  
  const manejarLetra = (letra: string) => {
    if (estadoJuego !== 'jugando' || letrasAdivinadas.has(letra)) return;
    
    // Reproducir sonido de tecla presionada
    console.log(`Tecla presionada: ${letra}`);
    soundsManager.current?.playSound('tecla');
    
    const nuevasLetrasAdivinadas = new Set(letrasAdivinadas);
    nuevasLetrasAdivinadas.add(letra);
    setLetrasAdivinadas(nuevasLetrasAdivinadas);
    
    if (palabraSecreta.includes(letra)) {
      const nuevaPalabraMostrada = [...palabraMostrada];
      for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
          nuevaPalabraMostrada[i] = letra;
        }
      }
      setPalabraMostrada(nuevaPalabraMostrada);
      soundsManager.current?.playSound('correcto');
      
      if (!nuevaPalabraMostrada.includes('_')) {
        setEstadoJuego('victoria');
        soundsManager.current?.playSound('victoria');
        toast({
          title: "¡Felicidades!",
          description: `Has adivinado la palabra: ${palabraSecreta}`,
          duration: 5000
        });
      }
    } else {
      soundsManager.current?.playSound('incorrecto');
      const nuevosIntentosRestantes = intentosRestantes - 1;
      setIntentosRestantes(nuevosIntentosRestantes);
      
      if (nuevosIntentosRestantes === 0) {
        setEstadoJuego('derrota');
        soundsManager.current?.playSound('derrota');
        toast({
          title: "¡Has perdido!",
          description: `La palabra era: ${palabraSecreta}`,
          variant: "destructive",
          duration: 5000
        });
      }
    }
  };
  
  // Función para alternar el estado de silencio
  const toggleMute = () => {
    if (isMuted) {
      soundsManager.current?.unmute();
      soundsManager.current?.startBackgroundMusic();
    } else {
      soundsManager.current?.mute();
      soundsManager.current?.stopBackgroundMusic();
    }
    setIsMuted(!isMuted);
  };

  return <Card className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-2xl">
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
          </div>

          <div className="mb-6">
            <Teclado letrasAdivinadas={letrasAdivinadas} onLetraClick={manejarLetra} deshabilitado={isLoading || estadoJuego !== 'jugando'} />
          </div>

          <div className="text-center">
            {estadoJuego === 'victoria' && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
                ¡Felicidades! Has ganado. La palabra era: <strong>{palabraSecreta}</strong>
              </div>}
            
            {estadoJuego === 'derrota' && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                ¡Has perdido! La palabra era: <strong>{palabraSecreta}</strong>
              </div>}
            
            <Button 
              variant="default" 
              size="lg" 
              className="mt-2 bg-purple-500 hover:bg-purple-600" 
              onClick={fetchPalabraSecreta}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : estadoJuego !== 'jugando' ? 'Jugar de Nuevo' : 'Reiniciar Juego'}
            </Button>
          </div>
        </div>
      </div>
    </Card>;
};

export default Ahorcado;
