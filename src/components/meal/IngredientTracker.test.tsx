import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import IngredientTracker from './IngredientTracker';
import { IngredientsProvider } from '../../context/IngredientsContext';

// Mock Material-UI components
vi.mock('@mui/material', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Typography: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  IconButton: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) => 
    open ? <div>{children}</div> : null,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogActions: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TextField: () => <input />,
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
  TableContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TableHead: ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>,
  TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
  Paper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock icons
vi.mock('@mui/icons-material', () => ({
  Add: () => 'AddIcon',
  Delete: () => 'DeleteIcon',
  Edit: () => 'EditIcon',
}));

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