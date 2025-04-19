import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  addIngredient as addIngredientToDb, 
  updateIngredient as updateIngredientInDb, 
  deleteIngredient as deleteIngredientFromDb,
  getIngredients as getIngredientsFromDb,
  Ingredient as DbIngredient
} from '../services/database';
import { auth } from '../config/firebase';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface IngredientsContextType {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Omit<Ingredient, 'id'>) => Promise<void>;
  updateIngredient: (id: string, ingredient: Omit<Ingredient, 'id'>) => Promise<void>;
  deleteIngredient: (id: string) => Promise<void>;
}

const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

export const IngredientsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const loadIngredients = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const dbIngredients = await getIngredientsFromDb(user.uid);
          setIngredients(dbIngredients.map(ing => ({
            id: ing.id,
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
            calories: ing.calories,
            protein: ing.protein,
            carbs: ing.carbs,
            fat: ing.fat
          })));
        } catch (error) {
          console.error('Error loading ingredients:', error);
        }
      }
    };

    loadIngredients();
  }, []);

  const addIngredient = async (ingredient: Omit<Ingredient, 'id'>) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User must be logged in to add ingredients');
    
    try {
      const newIngredient = {
        ...ingredient,
        userId: user.uid
      };
      const id = await addIngredientToDb(newIngredient);
      setIngredients(prev => [...prev, { ...ingredient, id }]);
    } catch (error) {
      console.error('Error adding ingredient:', error);
      throw error;
    }
  };

  const updateIngredient = async (id: string, ingredient: Omit<Ingredient, 'id'>) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User must be logged in to update ingredients');
    
    try {
      await updateIngredientInDb(id, {
        ...ingredient,
        userId: user.uid
      });
      setIngredients(prev => prev.map(ing => ing.id === id ? { ...ingredient, id } : ing));
    } catch (error) {
      console.error('Error updating ingredient:', error);
      throw error;
    }
  };

  const deleteIngredient = async (id: string) => {
    try {
      await deleteIngredientFromDb(id);
      setIngredients(prev => prev.filter(ing => ing.id !== id));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      throw error;
    }
  };

  return (
    <IngredientsContext.Provider value={{ ingredients, addIngredient, updateIngredient, deleteIngredient }}>
      {children}
    </IngredientsContext.Provider>
  );
};

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (context === undefined) {
    throw new Error('useIngredients must be used within an IngredientsProvider');
  }
  return context;
}; 