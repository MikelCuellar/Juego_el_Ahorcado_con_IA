
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
  selectedCategory: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelect,
  selectedCategory,
  disabled = false,
  isLoading = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectedCategory.trim() !== '') {
      e.preventDefault();
      onSelect(selectedCategory);
    }
  };

  return (
    <div className="mb-4">
      <Label htmlFor="category-input" className="mb-2 block text-gray-700">
        {disabled && selectedCategory ? 
          "Juego en curso" : 
          "Escribe una categoría para comenzar"
        }
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          id="category-input"
          type="text"
          value={selectedCategory}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ej: animales, deportes, países..."
          className="w-1/2"
        />
        <Button 
          onClick={() => onSelect(selectedCategory)}
          disabled={disabled || !selectedCategory.trim() || isLoading}
          className="bg-purple-500 hover:bg-purple-600"
        >
          {isLoading ? 'Cargando...' : disabled ? 'Iniciar Juego' : 'Iniciar'}
        </Button>
      </div>
    </div>
  );
};

export default CategorySelector;
