
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      onApiKeySet(savedKey);
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      onApiKeySet(apiKey);
      toast({
        title: "API Key guardada",
        description: "La API Key de Gemini ha sido guardada correctamente"
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <Input
          type="password"
          placeholder="Ingresa tu API Key de Google Gemini"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSaveApiKey}>Guardar API Key</Button>
      </div>
      <p className="text-sm text-gray-500">
        Necesitas una API Key de Google Gemini para generar palabras
      </p>
    </div>
  );
};

export default ApiKeyInput;
