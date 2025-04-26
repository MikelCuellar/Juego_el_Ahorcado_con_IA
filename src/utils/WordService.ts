
import { toast } from "@/components/ui/use-toast";

let apiKey: string | null = null;

export const setApiKey = (key: string) => {
  apiKey = key;
};

export const getRandomWordByCategory = async (category: string): Promise<string> => {
  if (!apiKey) {
    toast({
      title: "Error",
      description: "Por favor, ingresa una API Key de Google Gemini",
      variant: "destructive"
    });
    return "ahorcado";
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Dame una palabra en español de no más de 12 letras y no menos de 6, relacionada con ${category}. IMPORTANTE: Solo devuelve la palabra, sin ningún otro texto ni explicación.`
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (!response.ok || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Error al obtener la palabra');
    }

    let word = data.candidates[0].content.parts[0].text
      .toLowerCase()
      .trim()
      .replace(/[^a-záéíóúñ]/g, '');

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
    console.error("Error fetching word:", error);
    toast({
      title: "Error",
      description: "No se pudo obtener una palabra. Usando palabra predeterminada.",
      variant: "destructive"
    });
    return "ahorcado";
  }
};
