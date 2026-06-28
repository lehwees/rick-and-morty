import { describe, it, expect } from 'vitest'; 
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';

describe('Componente ThemeToggle', () => {
  it('deve renderizar o botão de alternar tema', () => {
    render(<ThemeToggle />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
  });
});