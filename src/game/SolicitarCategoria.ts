
import { palabraService } from "@/services/PalabraService";
import { useToast } from "@/hooks/use-toast";

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
      const { toast } = useToast();
      toast({
        title: "Error",
        description: "Por favor, ingresa una categoría antes de comenzar",
        variant: "destructive"
      });
      return "";
    }
    
    const resultado = await palabraService.peticionarIA(this.categoria);
    
    if (resultado.error) {
      const { toast } = useToast();
      toast({
        title: "Error",
        description: resultado.error,
        variant: "destructive"
      });
    }
    
    return resultado.palabra;
  }
}
