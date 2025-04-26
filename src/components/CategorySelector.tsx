
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

  return (
    <div className="mb-4">
      <Label htmlFor="category-input" className="mb-2 block text-gray-700">
        Escribe una categoría
      </Label>
      <Input
        id="category-input"
        type="text"
        value={selectedCategory}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Ej: animales, deportes, países..."
        className="w-full"
      />
    </div>
  );
};

export default CategorySelector;
