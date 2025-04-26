
import { Howl } from 'howler';

// Clase para gestionar los sonidos del juego
class SoundsManager {
  private sounds: {[key: string]: Howl};
  private backgroundMusic: Howl;
  
  constructor() {
    // Inicializar la música de fondo
    this.backgroundMusic = new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      volume: 0.3
    });
    
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
      }),
      tecla: new Howl({
        src: ['/sounds/keypress.wav'],
        volume: 0.5
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
  
  // Método para iniciar la música de fondo
  startBackgroundMusic(): void {
    this.backgroundMusic.play();
  }
  
  // Método para detener la música de fondo
  stopBackgroundMusic(): void {
    this.backgroundMusic.stop();
  }
  
  // Método para liberar los recursos de audio
  unload(): void {
    Object.values(this.sounds).forEach(sound => {
      sound.unload();
    });
    this.backgroundMusic.unload();
  }
}

export default SoundsManager;

