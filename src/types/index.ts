export interface Workout {
  id: string;
  date: Date;
  exercises: Exercise[];
  notes?: string;
}

export interface Exercise {
  name: string;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
  completed: boolean;
}

export interface Meal {
  id: string;
  date: Date;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes?: string;
}

export interface MealPlan {
  id: string;
  date: Date;
  meals: Meal[];
} 