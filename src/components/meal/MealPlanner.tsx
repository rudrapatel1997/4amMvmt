import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useIngredients } from '../../context/IngredientsContext';

interface MealIngredient {
  ingredientId: string;
  quantity: number;
}

interface Meal {
  id: string;
  name: string;
  ingredients: MealIngredient[];
}

interface IngredientRow {
  id: string;
  ingredientId: string;
  quantity: number;
}

const MealPlanner: React.FC = () => {
  const { ingredients } = useIngredients();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mealName, setMealName] = useState('');
  const [ingredientRows, setIngredientRows] = useState<IngredientRow[]>([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setMealName('');
    setIngredientRows([]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMealName('');
    setIngredientRows([]);
  };

  const handleAddIngredientRow = () => {
    setIngredientRows(prev => [...prev, {
      id: Date.now().toString(),
      ingredientId: '',
      quantity: 0,
    }]);
  };

  const handleRemoveIngredientRow = (id: string) => {
    setIngredientRows(prev => prev.filter(row => row.id !== id));
  };

  const handleUpdateIngredientRow = (id: string, field: keyof IngredientRow, value: string | number) => {
    setIngredientRows(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSubmit = () => {
    if (mealName && ingredientRows.length > 0 && ingredientRows.every(row => row.ingredientId && row.quantity > 0)) {
      setMeals(prev => [...prev, {
        id: Date.now().toString(),
        name: mealName,
        ingredients: ingredientRows.map(row => ({
          ingredientId: row.ingredientId,
          quantity: row.quantity,
        })),
      }]);
      handleCloseDialog();
    }
  };

  const calculateNutrition = (meal: Meal) => {
    return meal.ingredients.reduce((acc, curr) => {
      const ingredient = ingredients.find(ing => ing.id === curr.ingredientId);
      if (ingredient) {
        const ratio = curr.quantity / ingredient.quantity;
        return {
          calories: acc.calories + (ingredient.calories * ratio),
          protein: acc.protein + (ingredient.protein * ratio),
          carbs: acc.carbs + (ingredient.carbs * ratio),
          fat: acc.fat + (ingredient.fat * ratio),
        };
      }
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Meal Planner
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Create Meal
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meal Name</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map((meal) => {
              const nutrition = calculateNutrition(meal);
              return (
                <TableRow key={meal.id}>
                  <TableCell>{meal.name}</TableCell>
                  <TableCell>
                    {meal.ingredients.map((ing) => {
                      const ingredient = ingredients.find(i => i.id === ing.ingredientId);
                      return ingredient ? (
                        <Chip
                          key={ing.ingredientId}
                          label={`${ingredient.name} (${ing.quantity} ${ingredient.unit})`}
                          sx={{ m: 0.5 }}
                        />
                      ) : null;
                    })}
                  </TableCell>
                  <TableCell align="right">{nutrition.calories.toFixed(1)}</TableCell>
                  <TableCell align="right">{nutrition.protein.toFixed(1)}</TableCell>
                  <TableCell align="right">{nutrition.carbs.toFixed(1)}</TableCell>
                  <TableCell align="right">{nutrition.fat.toFixed(1)}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => setMeals(prev => prev.filter(m => m.id !== meal.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Create New Meal</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <TextField
              label="Meal Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              fullWidth
            />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {ingredientRows.map((row) => (
                <Box key={row.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl sx={{ flex: 5 }}>
                    <InputLabel>Ingredient</InputLabel>
                    <Select
                      value={row.ingredientId}
                      label="Ingredient"
                      onChange={(e) => handleUpdateIngredientRow(row.id, 'ingredientId', e.target.value)}
                    >
                      {ingredients.map((ingredient) => (
                        <MenuItem key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={row.quantity}
                    onChange={(e) => handleUpdateIngredientRow(row.id, 'quantity', parseFloat(e.target.value))}
                    sx={{ flex: 3 }}
                  />
                  <Typography sx={{ flex: 3 }}>
                    {ingredients.find(ing => ing.id === row.ingredientId)?.unit || ''}
                  </Typography>
                  <IconButton onClick={() => handleRemoveIngredientRow(row.id)} sx={{ flex: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddIngredientRow}
                sx={{ mt: 1 }}
              >
                Add Ingredient
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={!mealName || ingredientRows.length === 0 || !ingredientRows.every(row => row.ingredientId && row.quantity > 0)}
          >
            Create Meal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MealPlanner; 