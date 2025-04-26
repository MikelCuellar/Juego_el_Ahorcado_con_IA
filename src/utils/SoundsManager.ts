
import { Howl } from 'howler';

// Clase para gestionar los sonidos del juego
class SoundsManager {
  private sounds: {[key: string]: Howl};
  private backgroundMusic: Howl;
  private isMuted: boolean = false;
  
  constructor() {
    // Inicializar la música de fondo
    this.backgroundMusic = new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      volume: 0.3,
      html5: true, // Usar HTML5 Audio para mejor compatibilidad
      preload: true // Precargar el sonido
    });
    
    // Inicializar los sonidos
    this.sounds = {
      // Sonidos para las diferentes acciones del juego
      correcto: new Howl({
        src: ['/sounds/correcto.wav'],
        volume: 0.7,
        html5: true,
        preload: true
      }),
      incorrecto: new Howl({
        src: ['/sounds/incorrecto.wav'],
        volume: 0.7,
        html5: true,
        preload: true
      }),
      victoria: new Howl({
        src: ['/sounds/victoria.mp3'],
        volume: 0.8,
        html5: true,
        preload: true
      }),
      derrota: new Howl({
        src: ['/sounds/derrota.ogg'],
        volume: 0.8,
        html5: true,
        preload: true
      }),
      tecla: new Howl({
        src: ['/sounds/keypress.wav'],
        volume: 0.5,
        html5: true,
        preload: true
      })
    };
    
    // Verificar si hay archivos de sonido cargados y mostrar mensaje en consola
    console.log("SoundsManager inicializado. Verificando archivos de sonido...");
    this.checkSoundFiles();
  }
  
  // Método para verificar la existencia de los archivos de sonido
  private checkSoundFiles(): void {
    // Verificar la música de fondo
    this.backgroundMusic.once('loaderror', () => {
      console.error("Error: No se pudo cargar el archivo de música de fondo '/sounds/background.mp3'");
    });
    
    this.backgroundMusic.once('load', () => {
      console.log("Música de fondo cargada correctamente");
    });
    
    // Verificar cada sonido de efecto
    Object.entries(this.sounds).forEach(([name, sound]) => {
      sound.once('loaderror', () => {
        console.error(`Error: No se pudo cargar el archivo de sonido '${name}'`);
      });
      
      sound.once('load', () => {
        console.log(`Sonido '${name}' cargado correctamente`);
      });
    });
  }
  
  // Método para reproducir un sonido específico
  playSound(name: string): void {
    if (this.isMuted) return;
    
    if (this.sounds[name]) {
      console.log(`Reproduciendo sonido: ${name}`);
      this.sounds[name].play();
    } else {
      console.warn(`Sonido "${name}" no encontrado`);
    }
  }
  
  // Método para iniciar la música de fondo
  startBackgroundMusic(): void {
    if (this.isMuted) return;
    
    console.log("Iniciando música de fondo");
    // Detener si ya está reproduciendo para evitar superposiciones
    this.backgroundMusic.stop();
    this.backgroundMusic.play();
  }
  
  // Método para detener la música de fondo
  stopBackgroundMusic(): void {
    console.log("Deteniendo música de fondo");
    this.backgroundMusic.stop();
  }
  
  // Método para silenciar todos los sonidos
  mute(): void {
    this.isMuted = true;
    this.backgroundMusic.mute(true);
    Object.values(this.sounds).forEach(sound => {
      sound.mute(true);
    });
  }
  
  // Método para activar el sonido
  unmute(): void {
    this.isMuted = false;
    this.backgroundMusic.mute(false);
    Object.values(this.sounds).forEach(sound => {
      sound.mute(false);
    });
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
