export interface Recipe {
    _id: number;
    calories: string;
    dish: string;
    fat: string;
    ingredients: string;
    [key: string]: string | number;
}

export type UpdateType = 'calories' | 'ingredients' | 'add' | null;

// Define specific string literal type for headers
export type RecipeHeader = 'calories' | 'dish' | 'fat' | 'ingredients';

export interface AddCalorieProps {
    selectedRecipe: Recipe | null;
    setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
    updateType?: UpdateType;
}