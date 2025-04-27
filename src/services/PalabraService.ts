
import { toast } from "@/components/ui/use-toast";

const OPEN_WEBUI_URL = 'http://aps.pregps.cl:3000/v1/chat/completions';

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
      const response = await fetch(OPEN_WEBUI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Dame una palabra en español de no más de 12 letras y no menos de 6, relacionada con ${categoria}. IMPORTANTE: Solo devuelve la palabra, sin ningún otro texto ni explicación.`
          }],
          model: 'local-model',
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Error en la respuesta de la API:", data);
        return { palabra: "ahorcado", error: 'Error al obtener la palabra' };
      }
      
      if (!data.choices?.[0]?.message?.content) {
        console.error("Formato de respuesta inesperado:", data);
        return { palabra: "ahorcado", error: 'Formato de respuesta inesperado' };
      }

      let word = data.choices[0].message.content
        .toLowerCase()
        .trim()
        .replace(/[^a-záéíóúñ]/g, '');

      console.log("Palabra obtenida:", word);

      // Verificar longitud
      if (word.length > 12) {
        word = word.substring(0, 12);
      }

      // Si la palabra es muy corta, usar palabra por defecto
      if (word.length < 6) {
        return { palabra: "ahorcado" };
      }

      return { palabra: word };
    } catch (error) {
      console.error("Error al obtener la palabra:", error);
      return { palabra: "ahorcado", error: 'Error al conectar con el servicio' };
    }
  }
}

// Exportamos una instancia del servicio para usar en toda la aplicación
export const palabraService = new ServicioPalabrasIA();
