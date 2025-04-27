
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
  selectedCategory: string;
  disabled?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelect,
  selectedCategory,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectedCategory.trim() !== '') {
      // Prevent default to stop form submission if inside a form
      e.preventDefault();
      // Trigger the onSelect function with the current category
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
          disabled={disabled || !selectedCategory.trim()}
        >
          Iniciar
        </Button>
      </div>
    </div>
  );
};

export default CategorySelector;

