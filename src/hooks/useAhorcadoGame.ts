import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getRandomWordByCategory } from '@/utils/WordService';

export const useAhorcadoGame = () => {
  const [palabraSecreta, setPalabraSecreta] = useState<string>('');
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(new Set());
  const [intentosRestantes, setIntentosRestantes] = useState<number>(0);
  const [palabraMostrada, setPalabraMostrada] = useState<string[]>([]);
  const [estadoJuego, setEstadoJuego] = useState<'jugando' | 'victoria' | 'derrota'>('jugando');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<string>("");
  
  const { toast } = useToast();

  const fetchPalabraSecreta = async () => {
    if (!categoria.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa una categoría antes de comenzar",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const palabra = await getRandomWordByCategory(categoria);
      const palabraNormalizada = palabra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      console.log("Palabra normalizada:", palabraNormalizada);
      setPalabraSecreta(palabraNormalizada);
      setIntentosRestantes(Math.min(palabraNormalizada.length, 12));
      setPalabraMostrada(Array(palabraNormalizada.length).fill('_'));
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

  const manejarLetra = (letra: string, soundsManager: any) => {
    if (estadoJuego !== 'jugando' || letrasAdivinadas.has(letra)) return;
    
    letra = letra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    console.log(`Validando letra: ${letra} en palabra: ${palabraSecreta}`);
    
    soundsManager?.playSound('tecla');
    
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
      soundsManager?.playSound('correcto');
      
      if (!nuevaPalabraMostrada.includes('_')) {
        setEstadoJuego('victoria');
        soundsManager?.playSound('victoria');
        toast({
          title: "¡Felicidades!",
          description: `Has adivinado la palabra: ${palabraSecreta}`,
          duration: 5000
        });
      }
    } else {
      soundsManager?.playSound('incorrecto');
      const nuevosIntentosRestantes = intentosRestantes - 1;
      setIntentosRestantes(nuevosIntentosRestantes);
      
      if (nuevosIntentosRestantes === 0) {
        setEstadoJuego('derrota');
        soundsManager?.playSound('derrota');
        setCategoria('');
        toast({
          title: "¡Has perdido!",
          description: `La palabra era: ${palabraSecreta}`,
          variant: "destructive",
          duration: 5000
        });
      }
    }
  };

  return {
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
  };
};
