
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <Input
        id="category-input"
        type="text"
        value={selectedCategory}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ej: animales, deportes, países..."
        className="w-full"
      />
    </div>
  );
};

export default CategorySelector;

