
import { toast } from "@/components/ui/use-toast";
import { pipeline } from "@huggingface/transformers";

let textGenerator: any = null;

const initializeModel = async () => {
  if (!textGenerator) {
    try {
      textGenerator = await pipeline(
        'text-generation',
        'Xenova/gpt2-spanish',
        { device: 'cpu' }
      );
    } catch (error) {
      console.error("Error initializing model:", error);
      throw new Error("No se pudo inicializar el modelo");
    }
  }
  return textGenerator;
};

export const getRandomWordByCategory = async (category: string): Promise<string> => {
  try {
    const generator = await initializeModel();
    
    const prompt = `Dame 1, una y solo una palabra de no mas de 12 letras y no menos de 6, relacionadas con el tema ${category}`;
    const result = await generator(prompt, {
      max_new_tokens: 20,
      temperature: 0.7,
      do_sample: true,
    });

    let word = result[0].generated_text
      .split(' ')
      .pop()
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z]/g, '') || 'ahorcado';

    // Verificar longitud y caracteres válidos
    if (word.length > 12) {
      word = word.substring(0, 12);
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
