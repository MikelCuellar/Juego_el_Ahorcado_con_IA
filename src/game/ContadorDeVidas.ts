
// Clase para controlar las vidas/intentos del jugador
export class ContadorDeVidas {
  private vidas: number;
  private palabra: string;
  
  constructor(palabra: string, vidasIniciales?: number) {
    this.palabra = palabra;
    // Si no se especifican vidas iniciales, calculamos en función de la longitud de la palabra
    this.vidas = vidasIniciales || Math.min(palabra.length, 12);
  }
  
  // Reinicia el contador con una nueva palabra
  reiniciarVidas(nuevaPalabra: string, vidasIniciales?: number): void {
    this.palabra = nuevaPalabra;
    this.vidas = vidasIniciales || Math.min(nuevaPalabra.length, 12);
  }
  
  // Reduce la cantidad de vidas
  restarVida(): void {
    if (this.vidas > 0) {
      this.vidas--;
    }
  }
  
  // Obtiene el número de vidas restantes
  getVidas(): number {
    return this.vidas;
  }
  
  // Verifica si quedan vidas
  tieneVidas(): boolean {
    return this.vidas > 0;
  }
}
