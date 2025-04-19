import React, { useState } from 'react';
import { Workout, Exercise, Set } from '../../types';

export default function WorkoutPlanner() {
  const [workout, setWorkout] = useState<Workout>({
    id: '',
    date: new Date(),
    exercises: [],
    notes: ''
  });

  const addExercise = () => {
    const newExercise: Exercise = {
      name: '',
      sets: [{ reps: 0, weight: 0, completed: false }]
    };
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
  };

  const addSet = (exerciseIndex: number) => {
    setWorkout(prev => {
      const newExercises = [...prev.exercises];
      newExercises[exerciseIndex].sets.push({
        reps: 0,
        weight: 0,
        completed: false
      });
      return { ...prev, exercises: newExercises };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Plan Your Workout</h1>
        <button
          onClick={addExercise}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Exercise
        </button>
      </div>

      <div className="space-y-4">
        {workout.exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder="Exercise name"
              className="w-full p-2 border rounded-md mb-4"
              value={exercise.name}
              onChange={(e) => {
                const newExercises = [...workout.exercises];
                newExercises[exerciseIndex].name = e.target.value;
                setWorkout(prev => ({ ...prev, exercises: newExercises }));
              }}
            />
            
            <div className="space-y-2">
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Reps"
                    className="w-20 p-2 border rounded-md"
                    value={set.reps}
                    onChange={(e) => {
                      const newExercises = [...workout.exercises];
                      newExercises[exerciseIndex].sets[setIndex].reps = Number(e.target.value);
                      setWorkout(prev => ({ ...prev, exercises: newExercises }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Weight"
                    className="w-20 p-2 border rounded-md"
                    value={set.weight}
                    onChange={(e) => {
                      const newExercises = [...workout.exercises];
                      newExercises[exerciseIndex].sets[setIndex].weight = Number(e.target.value);
                      setWorkout(prev => ({ ...prev, exercises: newExercises }));
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() => addSet(exerciseIndex)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Set
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <textarea
          placeholder="Workout notes..."
          className="w-full p-2 border rounded-md"
          rows={3}
          value={workout.notes}
          onChange={(e) => setWorkout(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>

      <button
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        onClick={() => {
          // TODO: Save workout to Firebase
          console.log('Saving workout:', workout);
        }}
      >
        Save Workout
      </button>
    </div>
  );
} 