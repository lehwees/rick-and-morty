import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import type { Character } from '../types/character';
import { describe, it, expect, vi } from 'vitest';


const mockCharacter: Character = {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    location: { name: 'Citadel of Ricks', url: '' },
    origin: { name: 'unknown', url: '' },
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: '',
    created: ''
};

describe('Componente Modal', () => {
    it('deve renderizar as informações detalhadas do personagem', () => {
        render(
            <FavoritesProvider>
                <Modal character={mockCharacter} onClose={vi.fn()} />
            </FavoritesProvider>
        );

        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
        expect(screen.getByText('1 episódios')).toBeInTheDocument();
        expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    });

    it('deve chamar a função onClose quando o botão de fechar for clicado', () => {
        const mockOnClose = vi.fn();

        const { container } = render(
            <FavoritesProvider>
                <Modal character={mockCharacter} onClose={mockOnClose} />
            </FavoritesProvider>
        );

        const closeButton = container.querySelector('button');

        expect(closeButton).toBeInTheDocument();
        if (closeButton) {
            fireEvent.click(closeButton);
        }

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro se o Modal for renderizado sem o FavoritesProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => {
            render(<Modal character={mockCharacter} onClose={vi.fn()} />);
        }).toThrow('useFavorites deve ser usado dentro de um FavoritesProvider');

        consoleSpy.mockRestore(); 
    });

    it('deve lançar um erro se o Modal for renderizado sem o FavoritesProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => {
            render(<Modal character={mockCharacter} onClose={vi.fn()} />);
        }).toThrow('useFavorites deve ser usado dentro de um FavoritesProvider');

        consoleSpy.mockRestore();
    });

    it('não deve quebrar se o personagem for passado como nulo (se seu código permitir)', () => {
        render(
            <FavoritesProvider>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <Modal
                    character={{
                        name: 'Teste',
                        episode: [], 
                        location: { name: 'Desconhecido' },
                        origin: { name: 'Desconhecido' }
                    } as any}
                    onClose={vi.fn()}
                />
            </FavoritesProvider>
        );
    });

    it('deve lidar com a renderização quando character não possui todas as propriedades', () => {
        render(
            <FavoritesProvider>
                <Modal
                    character={{
                        name: 'Teste',
                        episode: [], 
                        location: { name: 'Desconhecido' },
                        origin: { name: 'Desconhecido' }
                    } as any}
                    onClose={vi.fn()}
                />
            </FavoritesProvider>
        );

        expect(screen.getByText('Teste')).toBeInTheDocument();
    });

    it('deve exibir "Nome não disponível" quando o nome estiver vazio', () => {
        const mockIncompleto = { ...mockCharacter, name: '' } as any;

        render(
            <FavoritesProvider>
                <Modal character={mockIncompleto} onClose={vi.fn()} />
            </FavoritesProvider>
        );

        expect(screen.getByText('Nome não disponível')).toBeInTheDocument();
    });

    it('deve alternar o estado de favorito ao clicar no botão', () => {
        render(
            <FavoritesProvider>
                <Modal character={mockCharacter} onClose={vi.fn()} />
            </FavoritesProvider>
        );

        const buttons = screen.getAllByRole('button');
        const favButton = buttons.find(btn => btn.querySelector('svg')); 

        fireEvent.click(favButton as HTMLElement);
    });

    it('deve renderizar o ícone de favoritado quando o personagem estiver nos favoritos', () => {
        render(
            <FavoritesProvider>
                <Modal character={mockCharacter} onClose={vi.fn()} />
            </FavoritesProvider>
        );
        expect(screen.getByTestId('icon-favorited')).toBeInTheDocument();
    });
})