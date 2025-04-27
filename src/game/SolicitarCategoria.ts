
import { palabraService } from "@/services/PalabraService";

// Clase para solicitar palabras basadas en una categoría
export class SolicitarCategoria {
  private categoria: string = "";
  
  // Establece la categoría
  setCategoria(nuevaCategoria: string): void {
    this.categoria = nuevaCategoria;
  }
  
  // Obtiene la categoría actual
  getCategoria(): string {
    return this.categoria;
  }
  
  // Valida si la categoría es válida para buscar palabras
  esValida(): boolean {
    return this.categoria.trim().length > 0;
  }
  
  // Solicita una palabra a la API basada en la categoría
  async pedirPalabraIA(): Promise<string> {
    if (!this.esValida()) {
      // Usar return para manejar el error sin hook
      console.error("Categoría no válida");
      return "";
    }
    
    const resultado = await palabraService.peticionarIA(this.categoria);
    
    if (resultado.error) {
      console.error("Error al obtener palabra:", resultado.error);
    }
    
    return resultado.palabra;
  }
}
