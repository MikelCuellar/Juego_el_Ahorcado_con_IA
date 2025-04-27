
import { Howl } from 'howler';

// Interfaz para los tipos de sonidos
export interface SonidoOpciones {
  nombre: string;
  src: string;
  volumen?: number;
  loop?: boolean;
}

// Clase para emisión de sonidos
export class EmitirSonidos {
  private sounds: {[key: string]: Howl};
  private backgroundMusic: Howl | null = null;
  private isMuted: boolean = false;
  
  constructor() {
    // Inicializar sonidos
    this.sounds = {};
    this.inicializarSonidos();
  }

  // Inicializar todos los sonidos del juego
  private inicializarSonidos(): void {
    // Música de fondo
    this.backgroundMusic = new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      volume: 0.3,
      html5: true,
      preload: true
    });
    
    // Efectos de sonido
    const efectosSonido: SonidoOpciones[] = [
      { nombre: 'correcto', src: '/sounds/correcto.wav', volumen: 0.7 },
      { nombre: 'incorrecto', src: '/sounds/incorrecto.wav', volumen: 0.7 },
      { nombre: 'victoria', src: '/sounds/victoria.mp3', volumen: 0.8 },
      { nombre: 'derrota', src: '/sounds/derrota.ogg', volumen: 0.8 },
      { nombre: 'tecla', src: '/sounds/keypress.wav', volumen: 0.5 }
    ];

    efectosSonido.forEach(efecto => {
      this.registrarSonido(efecto);
    });
    
    this.verificarArchivos();
  }

  // Registrar un nuevo sonido
  private registrarSonido(opciones: SonidoOpciones): void {
    this.sounds[opciones.nombre] = new Howl({
      src: [opciones.src],
      volume: opciones.volumen || 0.7,
      loop: opciones.loop || false,
      html5: true,
      preload: true
    });
  }
  
  // Verificar si los archivos de sonido existen
  private verificarArchivos(): void {
    // Verificar música de fondo
    if (this.backgroundMusic) {
      this.backgroundMusic.once('loaderror', () => {
        console.error("Error: No se pudo cargar el archivo de música de fondo");
      });
      
      this.backgroundMusic.once('load', () => {
        console.log("Música de fondo cargada correctamente");
      });
    }
    
    // Verificar efectos de sonido
    Object.entries(this.sounds).forEach(([nombre, sonido]) => {
      sonido.once('loaderror', () => {
        console.error(`Error: No se pudo cargar el archivo de sonido '${nombre}'`);
      });
      
      sonido.once('load', () => {
        console.log(`Sonido '${nombre}' cargado correctamente`);
      });
    });
  }

  // Método para reproducir un sonido específico
  emitirSonido(nombre: string): void {
    if (this.isMuted) return;
    
    if (this.sounds[nombre]) {
      console.log(`Reproduciendo sonido: ${nombre}`);
      this.sounds[nombre].play();
    } else {
      console.warn(`Sonido "${nombre}" no encontrado`);
    }
  }
  
  // Reproducir sonido dependiendo del resultado de un intento
  emitirSonidoAcierto(): void {
    this.emitirSonido('correcto');
  }

  emitirSonidoError(): void {
    this.emitirSonido('incorrecto');
  }

  emitirSonidoVictoria(): void {
    this.emitirSonido('victoria');
  }

  emitirSonidoDerrota(): void {
    this.emitirSonido('derrota');
  }
  
  // Método para iniciar la música de fondo
  iniciarMusicaFondo(): void {
    if (this.isMuted || !this.backgroundMusic) return;
    
    console.log("Iniciando música de fondo");
    // Detener si ya está reproduciendo para evitar superposiciones
    this.backgroundMusic.stop();
    this.backgroundMusic.play();
  }
  
  // Método para detener la música de fondo
  detenerMusicaFondo(): void {
    if (!this.backgroundMusic) return;
    
    console.log("Deteniendo música de fondo");
    this.backgroundMusic.stop();
  }
  
  // Método para silenciar todos los sonidos
  silenciar(): void {
    this.isMuted = true;
    if (this.backgroundMusic) {
      this.backgroundMusic.mute(true);
    }
    
    Object.values(this.sounds).forEach(sound => {
      sound.mute(true);
    });
  }
  
  // Método para activar el sonido
  activarSonido(): void {
    this.isMuted = false;
    if (this.backgroundMusic) {
      this.backgroundMusic.mute(false);
    }
    
    Object.values(this.sounds).forEach(sound => {
      sound.mute(false);
    });
  }
  
  // Método para verificar si el sonido está silenciado
  estaSilenciado(): boolean {
    return this.isMuted;
  }
  
  // Método para liberar los recursos de audio
  limpiarRecursos(): void {
    Object.values(this.sounds).forEach(sound => {
      sound.unload();
    });
    
    if (this.backgroundMusic) {
      this.backgroundMusic.unload();
    }
  }
}

// Instancia global del servicio de sonido
export const soundService = new EmitirSonidos();
