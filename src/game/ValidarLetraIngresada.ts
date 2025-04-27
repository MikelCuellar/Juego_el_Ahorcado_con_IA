
// Clase para validar las letras ingresadas por el usuario
export class ValidarLetraIngresada {
  private letraIngresada: string;
  
  constructor(letra: string) {
    this.letraIngresada = letra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  // Verifica si la letra es válida (solo letras permitidas)
  validarLetra(): boolean {
    return /^[a-z]$/.test(this.letraIngresada);
  }
  
  // Verifica si la letra coincide con alguna de la palabra
  coincideCon(palabra: string): boolean {
    const palabraNormalizada = palabra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return palabraNormalizada.includes(this.letraIngresada);
  }
  
  // Verifica si todas las letras han sido adivinadas (juego completado)
  esComplecion(palabraMostrada: string[]): boolean {
    return !palabraMostrada.includes('_');
  }
  
  // Obtiene la letra normalizada
  getLetra(): string {
    return this.letraIngresada;
  }
}
