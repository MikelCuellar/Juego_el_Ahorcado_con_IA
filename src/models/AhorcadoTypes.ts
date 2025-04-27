
// Tipos para el estado del juego
export type EstadoJuego = 'jugando' | 'victoria' | 'derrota';

// Interfaz para el estado del juego
export interface EstadoAhorcado {
  palabraSecreta: string;
  letrasAdivinadas: Set<string>;
  intentosRestantes: number;
  palabraMostrada: string[];
  estadoJuego: EstadoJuego;
  categoria: string;
}
