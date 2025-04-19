import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IngredientTracker from './IngredientTracker';
import { IngredientsProvider } from '../../context/IngredientsContext';

describe('IngredientTracker', () => {
  it('renders the add ingredient button', () => {
    render(
      <IngredientsProvider>
        <IngredientTracker />
      </IngredientsProvider>
    );
    
    const addButton = screen.getByRole('button', { name: /add ingredient/i });
    expect(addButton).toBeInTheDocument();
  });
}); 