import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useIngredients } from '../../context/IngredientsContext';

const MEASUREMENT_UNITS = [
  { value: 'g', label: 'Grams (g)' },
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'oz', label: 'Ounces (oz)' },
  { value: 'lb', label: 'Pounds (lb)' },
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'l', label: 'Liters (l)' },
  { value: 'cup', label: 'Cups' },
  { value: 'tbsp', label: 'Tablespoons (tbsp)' },
  { value: 'tsp', label: 'Teaspoons (tsp)' },
  { value: 'piece', label: 'Piece' },
  { value: 'slice', label: 'Slice' },
  { value: 'serving', label: 'Serving' },
];

const IngredientTracker: React.FC = () => {
  const { ingredients, addIngredient, updateIngredient, deleteIngredient } = useIngredients();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    unit: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const handleOpenDialog = (ingredientId?: string) => {
    if (ingredientId) {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        setEditingIngredient(ingredientId);
        setFormData({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          calories: ingredient.calories,
          protein: ingredient.protein,
          carbs: ingredient.carbs,
          fat: ingredient.fat,
        });
      }
    } else {
      setEditingIngredient(null);
      setFormData({
        name: '',
        quantity: 0,
        unit: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingIngredient(null);
  };

  const handleSubmit = () => {
    if (editingIngredient) {
      updateIngredient(editingIngredient, formData);
    } else {
      addIngredient(formData);
    }
    handleCloseDialog();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value),
    }));
  };

  const handleUnitChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      unit: e.target.value,
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Ingredient Tracker
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Ingredient
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell align="right">{ingredient.quantity}</TableCell>
                <TableCell align="right">{ingredient.unit}</TableCell>
                <TableCell align="right">{ingredient.calories}</TableCell>
                <TableCell align="right">{ingredient.protein}</TableCell>
                <TableCell align="right">{ingredient.carbs}</TableCell>
                <TableCell align="right">{ingredient.fat}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(ingredient.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteIngredient(ingredient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingIngredient ? 'Edit Ingredient' : 'Add New Ingredient'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Unit</InputLabel>
                <Select
                  value={formData.unit}
                  label="Unit"
                  onChange={handleUnitChange}
                >
                  {MEASUREMENT_UNITS.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="Calories"
              name="calories"
              type="number"
              value={formData.calories}
              onChange={handleInputChange}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Protein (g)"
                name="protein"
                type="number"
                value={formData.protein}
                onChange={handleInputChange}
              />
              <TextField
                label="Carbs (g)"
                name="carbs"
                type="number"
                value={formData.carbs}
                onChange={handleInputChange}
              />
              <TextField
                label="Fat (g)"
                name="fat"
                type="number"
                value={formData.fat}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingIngredient ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IngredientTracker; 