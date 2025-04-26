
import { toast } from "@/components/ui/use-toast";

const PERPLEXITY_API_KEY = ""; // This should be provided by the user

export const getRandomWordByCategory = async (category: string): Promise<string> => {
  try {
    console.log(`Fetching word for category: ${category}`);
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Eres un generador de palabras. Debes generar UNA SOLA palabra en español, sin tildes, relacionada con la categoría dada. La palabra debe tener máximo 12 letras. Responde solo con la palabra, sin explicaciones ni puntuación.'
          },
          {
            role: 'user',
            content: `Dame una palabra de la categoría: ${category}`
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }

    const data = await response.json();
    const word = data.choices[0].message.content.trim().toLowerCase();

    // Verificar longitud y caracteres válidos
    if (word.length > 12) {
      return word.substring(0, 12);
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
