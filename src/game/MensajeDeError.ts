
// Clase para mostrar mensajes de error
export class MensajeDeError {
  private tipoMensaje: string;
  
  constructor(tipo: string = 'general') {
    this.tipoMensaje = tipo;
  }
  
  // Registra un mensaje de error en la consola
  mostrarMensaje(mensaje: string): void {
    console.error(`[${this.tipoMensaje}] Error: ${mensaje}`);
  }
}
