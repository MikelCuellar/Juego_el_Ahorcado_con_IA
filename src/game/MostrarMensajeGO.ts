
import { EstadoJuego } from "@/models/AhorcadoTypes";

// Clase para generar mensajes de fin de juego
export class MostrarMensajeGO {
  private estadoJuego: EstadoJuego;
  
  constructor(estadoJuego: EstadoJuego) {
    this.estadoJuego = estadoJuego;
  }
  
  // Establece un nuevo estado
  setEstado(nuevoEstado: EstadoJuego): void {
    this.estadoJuego = nuevoEstado;
  }
  
  // Genera el mensaje según el estado del juego
  mostrar(palabraSecreta: string): string {
    if (this.estadoJuego === 'victoria') {
      return `¡Felicidades! Has ganado. La palabra era: ${palabraSecreta}`;
    } else if (this.estadoJuego === 'derrota') {
      return `¡Has perdido! La palabra era: ${palabraSecreta}`;
    }
    return '';
  }
}
