import React, { useState } from 'react';
import { Meal, MealPlan } from '../../types';

export default function MealPlanner() {
  const [mealPlan, setMealPlan] = useState<MealPlan>({
    id: '',
    date: new Date(),
    meals: []
  });

  const addMeal = () => {
    const newMeal: Meal = {
      id: '',
      date: new Date(),
      name: '',
      type: 'breakfast',
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };
    setMealPlan(prev => ({
      ...prev,
      meals: [...prev.meals, newMeal]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Plan Your Meals</h1>
        <button
          onClick={addMeal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Meal
        </button>
      </div>

      <div className="space-y-4">
        {mealPlan.meals.map((meal, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Meal name"
                className="p-2 border rounded-md"
                value={meal.name}
                onChange={(e) => {
                  const newMeals = [...mealPlan.meals];
                  newMeals[index].name = e.target.value;
                  setMealPlan(prev => ({ ...prev, meals: newMeals }));
                }}
              />
              
              <select
                className="p-2 border rounded-md"
                value={meal.type}
                onChange={(e) => {
                  const newMeals = [...mealPlan.meals];
                  newMeals[index].type = e.target.value as Meal['type'];
                  setMealPlan(prev => ({ ...prev, meals: newMeals }));
                }}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Calories</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={meal.calories}
                  onChange={(e) => {
                    const newMeals = [...mealPlan.meals];
                    newMeals[index].calories = Number(e.target.value);
                    setMealPlan(prev => ({ ...prev, meals: newMeals }));
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={meal.protein}
                  onChange={(e) => {
                    const newMeals = [...mealPlan.meals];
                    newMeals[index].protein = Number(e.target.value);
                    setMealPlan(prev => ({ ...prev, meals: newMeals }));
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={meal.carbs}
                  onChange={(e) => {
                    const newMeals = [...mealPlan.meals];
                    newMeals[index].carbs = Number(e.target.value);
                    setMealPlan(prev => ({ ...prev, meals: newMeals }));
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fats (g)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={meal.fats}
                  onChange={(e) => {
                    const newMeals = [...mealPlan.meals];
                    newMeals[index].fats = Number(e.target.value);
                    setMealPlan(prev => ({ ...prev, meals: newMeals }));
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        onClick={() => {
          // TODO: Save meal plan to Firebase
          console.log('Saving meal plan:', mealPlan);
        }}
      >
        Save Meal Plan
      </button>
    </div>
  );
} 