import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Layout from './components/common/Layout';
import WorkoutPlanner from './components/workout/WorkoutPlanner';
import WorkoutTracker from './components/workout/WorkoutTracker';
import WorkoutHistory from './components/workout/WorkoutHistory';
import MealPlanner from './components/meal/MealPlanner';
import MealTracker from './components/meal/MealTracker';
import MealHistory from './components/meal/MealHistory';
import IngredientTracker from './components/meal/IngredientTracker';
import { IngredientsProvider } from './context/IngredientsContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IngredientsProvider>
        <Router>
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<div>Dashboard Content</div>} />
              <Route path="/workouts">
                <Route index element={<WorkoutPlanner />} />
                <Route path="tracker" element={<WorkoutTracker />} />
                <Route path="history" element={<WorkoutHistory />} />
              </Route>
              <Route path="/meals">
                <Route index element={<MealPlanner />} />
                <Route path="tracker" element={<MealTracker />} />
                <Route path="history" element={<MealHistory />} />
                <Route path="ingredients" element={<IngredientTracker />} />
              </Route>
              <Route path="/settings" element={<div>Settings Content</div>} />
            </Routes>
          </Container>
        </Router>
      </IngredientsProvider>
    </ThemeProvider>
  );
};

export default App; 