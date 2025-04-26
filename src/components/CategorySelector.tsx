
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const categories = [
    { value: "animales", label: "Animales" },
    { value: "paises", label: "Países" },
    { value: "frutas", label: "Frutas" },
    { value: "deportes", label: "Deportes" },
    { value: "profesiones", label: "Profesiones" }
  ];

  return (
    <div className="mb-4">
      <Label htmlFor="category-selector" className="mb-2 block text-gray-700">
        Selecciona una categoría
      </Label>
      <Select
        value={selectedCategory}
        onValueChange={onSelect}
        disabled={disabled}
      >
        <SelectTrigger id="category-selector" className="w-full">
          <SelectValue placeholder="Selecciona una categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
