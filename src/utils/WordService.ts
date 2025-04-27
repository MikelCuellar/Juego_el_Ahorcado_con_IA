
import { toast } from "@/components/ui/use-toast";

const OPEN_WEBUI_URL = 'https://aps.pregps.cl:3000/v1/chat/completions';

export const getRandomWordByCategory = async (category: string): Promise<string> => {
  try {
    const response = await fetch(OPEN_WEBUI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: `Dame una palabra en español de no más de 12 letras y no menos de 6, relacionada con ${category}. IMPORTANTE: Solo devuelve la palabra, sin ningún otro texto ni explicación.`
        }],
        model: 'local-model',
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error en la respuesta de la API:", data);
      throw new Error('Error al obtener la palabra');
    }
    
    if (!data.choices?.[0]?.message?.content) {
      console.error("Formato de respuesta inesperado:", data);
      throw new Error('Formato de respuesta inesperado');
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
      return "ahorcado";
    }

    // Remover tildes y caracteres especiales
    return word.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/g, "");

  } catch (error) {
    console.error("Error al obtener la palabra:", error);
    toast({
      title: "Error",
      description: "No se pudo obtener una palabra. Usando palabra predeterminada.",
      variant: "destructive"
    });
    return "ahorcado";
  }
};
