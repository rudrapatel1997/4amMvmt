import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { FitnessCenter, Restaurant, Dashboard, Settings, ArrowDropDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [workoutAnchor, setWorkoutAnchor] = useState<null | HTMLElement>(null);
  const [mealAnchor, setMealAnchor] = useState<null | HTMLElement>(null);

  const handleWorkoutMenu = (event: React.MouseEvent<HTMLElement>) => {
    setWorkoutAnchor(event.currentTarget);
  };

  const handleMealMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMealAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setWorkoutAnchor(null);
    setMealAnchor(null);
  };

  const navItems = [
    { name: 'Dashboard', icon: <Dashboard />, path: '/' },
    { name: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          4AM MVMT
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{ mx: 1 }}
            >
              {item.name}
            </Button>
          ))}
          <Button
            color="inherit"
            startIcon={<FitnessCenter />}
            endIcon={<ArrowDropDown />}
            onClick={handleWorkoutMenu}
            sx={{ mx: 1 }}
          >
            Workouts
          </Button>
          <Menu
            anchorEl={workoutAnchor}
            open={Boolean(workoutAnchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/workouts'); handleClose(); }}>Plan Workout</MenuItem>
            <MenuItem onClick={() => { navigate('/workouts/tracker'); handleClose(); }}>Track Workout</MenuItem>
            <MenuItem onClick={() => { navigate('/workouts/history'); handleClose(); }}>Workout History</MenuItem>
          </Menu>
          <Button
            color="inherit"
            startIcon={<Restaurant />}
            endIcon={<ArrowDropDown />}
            onClick={handleMealMenu}
            sx={{ mx: 1 }}
          >
            Meals
          </Button>
          <Menu
            anchorEl={mealAnchor}
            open={Boolean(mealAnchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/meals'); handleClose(); }}>Plan Meal</MenuItem>
            <MenuItem onClick={() => { navigate('/meals/tracker'); handleClose(); }}>Track Meal</MenuItem>
            <MenuItem onClick={() => { navigate('/meals/history'); handleClose(); }}>Meal History</MenuItem>
            <MenuItem onClick={() => { navigate('/meals/ingredients'); handleClose(); }}>Track Ingredients</MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          {navItems.map((item) => (
            <IconButton
              key={item.name}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{ mx: 0.5 }}
            >
              {item.icon}
            </IconButton>
          ))}
          <IconButton
            color="inherit"
            onClick={handleWorkoutMenu}
            sx={{ mx: 0.5 }}
          >
            <FitnessCenter />
          </IconButton>
          <Menu
            anchorEl={workoutAnchor}
            open={Boolean(workoutAnchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/workouts'); handleClose(); }}>Plan Workout</MenuItem>
            <MenuItem onClick={() => { navigate('/workouts/tracker'); handleClose(); }}>Track Workout</MenuItem>
            <MenuItem onClick={() => { navigate('/workouts/history'); handleClose(); }}>Workout History</MenuItem>
          </Menu>
          <IconButton
            color="inherit"
            onClick={handleMealMenu}
            sx={{ mx: 0.5 }}
          >
            <Restaurant />
          </IconButton>
          <Menu
            anchorEl={mealAnchor}
            open={Boolean(mealAnchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/meals'); handleClose(); }}>Plan Meal</MenuItem>
            <MenuItem onClick={() => { navigate('/meals/tracker'); handleClose(); }}>Track Meal</MenuItem>
            <MenuItem onClick={() => { navigate('/meals/history'); handleClose(); }}>Meal History</MenuItem>
            <MenuItem onClick={() => { navigate('/meals/ingredients'); handleClose(); }}>Track Ingredients</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 