
import { toast } from "@/components/ui/use-toast";
import palabras from '@/utils/palabras';

const OPEN_WEBUI_URL = 'http://aps.pregps.cl:3000/v1/chat/completions';

const getRandomWordFromList = (category: string): string => {
  // Get a random word from our local list
  const randomIndex = Math.floor(Math.random() * palabras.length);
  return palabras[randomIndex];
};

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
      return getRandomWordFromList(category);
    }
    
    if (!data.choices?.[0]?.message?.content) {
      console.error("Formato de respuesta inesperado:", data);
      return getRandomWordFromList(category);
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

    // Si la palabra es muy corta, usar palabra aleatoria de la lista
    if (word.length < 6) {
      return getRandomWordFromList(category);
    }

    return word;
  } catch (error) {
    console.error("Error al obtener la palabra:", error);
    toast({
      title: "Usando palabra local",
      description: "No se pudo conectar a la IA. Usando palabra de la lista local.",
      variant: "default"
    });
    return getRandomWordFromList(category);
  }
};

