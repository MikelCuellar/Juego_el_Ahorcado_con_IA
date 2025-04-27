
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputRegirCategoriaProps {
  onCategoria: (category: string) => void;
  selectedCategoria: string;
  disabled?: boolean;
}

const InputRegirCategoria: React.FC<InputRegirCategoriaProps> = ({
  onCategoria,
  selectedCategoria,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCategoria(e.target.value);
  };

  return (
    <div className="mb-4">
      <Label htmlFor="category-input" className="mb-2 block text-gray-700">
        Escribe una categoría para comenzar
      </Label>
      <Input
        id="category-input"
        type="text"
        value={selectedCategoria}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Ej: animales, deportes, países..."
        className="w-full"
      />
    </div>
  );
};

export default InputRegirCategoria;
