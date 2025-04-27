
import { getRandomWordByCategory } from "@/utils/WordService";

// Interfaz para respuestas del servicio
export interface ServicioPalabraResponse {
  palabra: string;
  error?: string;
}

// Clase para manejar peticiones de palabras a la API
export class ServicioPalabrasIA {
  // Método para obtener una palabra basada en una categoría
  async peticionarIA(categoria: string): Promise<ServicioPalabraResponse> {
    try {
      // Utilizar directamente la función de WordService que ya maneja los errores
      // y la selección de palabras locales cuando la API falla
      const palabra = await getRandomWordByCategory(categoria);
      return { palabra };
    } catch (error) {
      console.error("Error al obtener la palabra:", error);
      return { palabra: "ahorcado", error: 'Error al conectar con el servicio' };
    }
  }
}

// Exportamos una instancia del servicio para usar en toda la aplicación
export const palabraService = new ServicioPalabrasIA();
