
// Clase para encargarse de ocultar la palabra del juego
export class EsconderPalabra {
  private palabra: string;

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  // Cambia la palabra secreta
  cambiarPalabra(nuevaPalabra: string): void {
    this.palabra = nuevaPalabra;
  }

  // Genera una representación de la palabra con guiones bajos y letras adivinadas
  mostrarPalabra(letrasAdivinadas: Set<string>): string[] {
    if (!this.palabra) return [];
    
    return Array.from(this.palabra).map(letra => {
      // Normalize the letter to handle accents
      const letraNormalizada = letra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      // Check if the letter has been guessed
      if (Array.from(letrasAdivinadas).some(l => 
          l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === letraNormalizada)) {
        return letra;
      }
      return '_';
    });
  }
}
