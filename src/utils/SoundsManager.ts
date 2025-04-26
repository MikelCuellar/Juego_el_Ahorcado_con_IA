
import { Howl } from 'howler';

// Clase para gestionar los sonidos del juego
class SoundsManager {
  private sounds: {[key: string]: Howl};
  
  constructor() {
    // Inicializar los sonidos
    this.sounds = {
      // Sonidos para las diferentes acciones del juego
      correcto: new Howl({
        src: ['/sounds/correcto.wav'],
        volume: 0.7
      }),
      incorrecto: new Howl({
        src: ['/sounds/incorrecto.wav'],
        volume: 0.7
      }),
      victoria: new Howl({
        src: ['/sounds/victoria.mp3'],
        volume: 0.8
      }),
      derrota: new Howl({
        src: ['/sounds/derrota.ogg'],
        volume: 0.8
      })
    };
  }
  
  // Método para reproducir un sonido específico
  playSound(name: string): void {
    if (this.sounds[name]) {
      this.sounds[name].play();
    } else {
      console.warn(`Sonido "${name}" no encontrado`);
    }
  }
  
  // Método para liberar los recursos de audio
  unload(): void {
    Object.values(this.sounds).forEach(sound => {
      sound.unload();
    });
  }
}

export default SoundsManager;
