
import { toast } from "@/components/ui/use-toast";

interface WordResponse {
  word: string;
  category: string;
}

export const getRandomWordByCategory = async (category: string): Promise<string> => {
  // This is a temporary implementation for demo purposes
  // In a real app, you would call an actual AI API endpoint
  try {
    console.log(`Fetching word for category: ${category}`);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll use predefined words by category
    const wordsByCategory: Record<string, string[]> = {
      "animales": ["perro", "gato", "elefante", "jirafa", "tigre", "leon", "tortuga", "delfin"],
      "paises": ["españa", "mexico", "chile", "argentina", "colombia", "ecuador", "panama", "peru"],
      "frutas": ["manzana", "platano", "naranja", "uva", "fresa", "mango", "piña", "sandia"],
      "deportes": ["futbol", "tenis", "basquet", "natacion", "ciclismo", "golf", "voley", "surf"],
      "profesiones": ["doctor", "profesor", "ingeniero", "abogado", "cocinero", "policia", "bombero"]
    };
    
    // Default to "animales" if category not found
    const words = wordsByCategory[category.toLowerCase()] || wordsByCategory["animales"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    // Ensure word is not longer than 12 letters
    if (randomWord.length > 12) {
      return randomWord.substring(0, 12);
    }
    
    return randomWord.toUpperCase();
  } catch (error) {
    console.error("Error fetching word:", error);
    toast({
      title: "Error",
      description: "No se pudo obtener una palabra. Usando palabra predeterminada.",
      variant: "destructive"
    });
    return "AHORCADO";
  }
};
