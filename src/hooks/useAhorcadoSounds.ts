
import { useRef, useState, useEffect } from 'react';
import { soundService } from '@/services/SoundService';

export const useAhorcadoSounds = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  useEffect(() => {
    console.log("Inicializando gestor de sonidos...");
    
    setTimeout(() => {
      console.log("Intentando reproducir música de fondo...");
      soundService.iniciarMusicaFondo();
    }, 1000);
    
    return () => {
      console.log("Limpiando gestor de sonidos...");
      soundService.detenerMusicaFondo();
      soundService.limpiarRecursos();
    };
  }, []);

  const toggleMute = () => {
    if (isMuted) {
      soundService.activarSonido();
      soundService.iniciarMusicaFondo();
    } else {
      soundService.silenciar();
      soundService.detenerMusicaFondo();
    }
    setIsMuted(!isMuted);
  };

  return {
    isMuted,
    soundsManager: soundService,
    toggleMute
  };
};
