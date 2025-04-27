
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EstadoJuego } from '@/models/AhorcadoTypes';
import { SolicitarCategoria } from '@/game/SolicitarCategoria';
import { EsconderPalabra } from '@/game/EsconderPalabra';
import { ValidarLetraIngresada } from '@/game/ValidarLetraIngresada';
import { ContadorDeVidas } from '@/game/ContadorDeVidas';
import { soundService } from '@/services/SoundService';

export const useAhorcadoGame = () => {
  const [palabraSecreta, setPalabraSecreta] = useState<string>('');
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(new Set());
  const [intentosRestantes, setIntentosRestantes] = useState<number>(0);
  const [palabraMostrada, setPalabraMostrada] = useState<string[]>([]);
  const [estadoJuego, setEstadoJuego] = useState<EstadoJuego>('jugando');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<string>("");
  
  const { toast } = useToast();

  // Solicitar palabra basada en categoría
  const fetchPalabraSecreta = async () => {
    const solicitador = new SolicitarCategoria();
    solicitador.setCategoria(categoria);
    
    if (!solicitador.esValida()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa una categoría antes de comenzar",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const palabra = await solicitador.pedirPalabraIA();
      if (palabra) {
        const palabraNormalizada = palabra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        console.log("Palabra normalizada:", palabraNormalizada);
        setPalabraSecreta(palabraNormalizada);
        
        // Iniciar contador de vidas
        const contador = new ContadorDeVidas(palabraNormalizada);
        setIntentosRestantes(contador.getVidas());
        
        // Preparar palabra mostrada
        const escondedor = new EsconderPalabra(palabraNormalizada);
        setPalabraMostrada(escondedor.mostrarPalabra(new Set()));
        
        // Reiniciar letras y estado
        setLetrasAdivinadas(new Set());
        setEstadoJuego('jugando');
      }
    } catch (error) {
      console.error("Error al obtener palabra:", error);
      toast({
        title: "Error",
        description: "Error al obtener palabra. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const manejarLetra = (letra: string) => {
    if (estadoJuego !== 'jugando' || letrasAdivinadas.has(letra)) return;
    
    // Validar letra ingresada
    const validador = new ValidarLetraIngresada(letra);
    const letraNormalizada = validador.getLetra();
    
    console.log(`Validando letra: ${letraNormalizada} en palabra: ${palabraSecreta}`);
    
    // Reproducir sonido de tecla
    soundService.emitirSonido('tecla');
    
    // Agregar letra a las adivinadas
    const nuevasLetrasAdivinadas = new Set(letrasAdivinadas);
    nuevasLetrasAdivinadas.add(letra);
    setLetrasAdivinadas(nuevasLetrasAdivinadas);
    
    // Verificar si la letra está en la palabra
    if (palabraSecreta.includes(letraNormalizada)) {
      // Actualizar palabra mostrada
      const escondedor = new EsconderPalabra(palabraSecreta);
      const nuevaPalabraMostrada = escondedor.mostrarPalabra(nuevasLetrasAdivinadas);
      setPalabraMostrada(nuevaPalabraMostrada);
      
      // Reproducir sonido correcto
      soundService.emitirSonidoAcierto();
      
      // Verificar victoria - si no hay guiones en la palabra mostrada
      if (!nuevaPalabraMostrada.includes('_')) {
        setEstadoJuego('victoria');
        soundService.emitirSonidoVictoria();
        toast({
          title: "¡Felicidades!",
          description: `Has adivinado la palabra: ${palabraSecreta}`,
          duration: 5000
        });
      }
    } else {
      // Letra incorrecta
      soundService.emitirSonidoError();
      
      // Actualizar intentos
      const nuevoIntentosRestantes = intentosRestantes - 1;
      setIntentosRestantes(nuevoIntentosRestantes);
      
      // Verificar derrota
      if (nuevoIntentosRestantes === 0) {
        setEstadoJuego('derrota');
        soundService.emitirSonidoDerrota();
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
