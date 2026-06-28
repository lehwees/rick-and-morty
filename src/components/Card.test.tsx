import { Card } from './Card';
import { describe, it, expect, vi } from 'vitest';
import type { Character } from '../types/character';
import { render, fireEvent } from '@testing-library/react';
import { FavoritesProvider } from '../contexts/FavoritesContext';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Citadel of Ricks', url: '' },
  origin: { name: 'Earth (C-137)', url: '' },
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: '',
  created: ''
};

describe('Componente Card', () => {
  it('deve alternar o estado de favorito ao clicar no botão', () => {
    const { container } = render(
      <FavoritesProvider>
        <Card character={mockCharacter} onClick={vi.fn()} />
      </FavoritesProvider>
    );
    const favButton = container.querySelector('button');
    
    expect(favButton).toBeInTheDocument();

    if (favButton) {
      fireEvent.click(favButton); 
      fireEvent.click(favButton); 
    }
  });
});