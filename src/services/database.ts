import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Types
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface MealIngredient {
  ingredientId: string;
  quantity: number;
}

export interface Meal {
  id: string;
  name: string;
  ingredients: MealIngredient[];
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Collections
const INGREDIENTS_COLLECTION = 'ingredients';
const MEALS_COLLECTION = 'meals';
const USER_PROFILES_COLLECTION = 'userProfiles';

// Ingredient Operations
export const getIngredients = async (userId: string): Promise<Ingredient[]> => {
  const q = query(collection(db, INGREDIENTS_COLLECTION), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ingredient));
};

export const getIngredient = async (id: string): Promise<Ingredient | null> => {
  const docRef = doc(db, INGREDIENTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Ingredient : null;
};

export const addIngredient = async (ingredient: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = doc(collection(db, INGREDIENTS_COLLECTION));
  const newIngredient = {
    ...ingredient,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  await setDoc(docRef, newIngredient);
  return docRef.id;
};

export const updateIngredient = async (id: string, ingredient: Partial<Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const docRef = doc(db, INGREDIENTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...ingredient,
    updatedAt: Timestamp.now(),
  });
};

export const deleteIngredient = async (id: string): Promise<void> => {
  const docRef = doc(db, INGREDIENTS_COLLECTION, id);
  await deleteDoc(docRef);
};

// Meal Operations
export const getMeals = async (userId: string): Promise<Meal[]> => {
  const q = query(collection(db, MEALS_COLLECTION), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Meal));
};

export const getMeal = async (id: string): Promise<Meal | null> => {
  const docRef = doc(db, MEALS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Meal : null;
};

export const addMeal = async (meal: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = doc(collection(db, MEALS_COLLECTION));
  const newMeal = {
    ...meal,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  await setDoc(docRef, newMeal);
  return docRef.id;
};

export const updateMeal = async (id: string, meal: Partial<Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const docRef = doc(db, MEALS_COLLECTION, id);
  await updateDoc(docRef, {
    ...meal,
    updatedAt: Timestamp.now(),
  });
};

export const deleteMeal = async (id: string): Promise<void> => {
  const docRef = doc(db, MEALS_COLLECTION, id);
  await deleteDoc(docRef);
};

// User Profile Operations
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const docRef = doc(db, USER_PROFILES_COLLECTION, userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as UserProfile : null;
};

export const createUserProfile = async (userId: string, profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  const docRef = doc(db, USER_PROFILES_COLLECTION, userId);
  const newProfile = {
    ...profile,
    id: userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  await setDoc(docRef, newProfile);
};

export const updateUserProfile = async (userId: string, profile: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const docRef = doc(db, USER_PROFILES_COLLECTION, userId);
  await updateDoc(docRef, {
    ...profile,
    updatedAt: Timestamp.now(),
  });
}; 