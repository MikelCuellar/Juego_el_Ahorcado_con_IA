
import { useRef, useState, useEffect } from 'react';
import SoundsManager from '@/utils/SoundsManager';

export const useAhorcadoSounds = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const soundsManager = useRef<SoundsManager | null>(null);

  useEffect(() => {
    console.log("Inicializando gestor de sonidos...");
    soundsManager.current = new SoundsManager();
    
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

  return {
    isMuted,
    soundsManager: soundsManager.current,
    toggleMute
  };
};
