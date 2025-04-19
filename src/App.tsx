import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import WorkoutPlanner from './components/workout/WorkoutPlanner';
import WorkoutTracker from './components/workout/WorkoutTracker';
import WorkoutHistory from './components/workout/WorkoutHistory';
import MealPlanner from './components/meal/MealPlanner';
import MealTracker from './components/meal/MealTracker';
import MealHistory from './components/meal/MealHistory';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WorkoutPlanner />} />
          <Route path="/workout-tracker" element={<WorkoutTracker />} />
          <Route path="/workout-history" element={<WorkoutHistory />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/meal-tracker" element={<MealTracker />} />
          <Route path="/meal-history" element={<MealHistory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 