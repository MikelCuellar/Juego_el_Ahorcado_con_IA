
import { useToast } from "@/hooks/use-toast";

// Clase para mostrar mensajes de error
export class MensajeDeError {
  private tipoMensaje: string;
  
  constructor(tipo: string = 'general') {
    this.tipoMensaje = tipo;
  }
  
  // Muestra un mensaje de error
  mostrarMensaje(mensaje: string): void {
    const { toast } = useToast();
    
    toast({
      title: "Error",
      description: mensaje,
      variant: "destructive",
      duration: 5000
    });
  }
}
