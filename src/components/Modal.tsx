import type { Character } from '../types/character';
import { useFavorites } from '../hooks/useFavorites';

interface ModalProps {
    character: Character | null;
    onClose: () => void;
}

export function Modal({ character, onClose }: ModalProps) {
    const { toggleFavorite, isFavorite } = useFavorites();

    if (!character) return null;
    const favorited = isFavorite(character.id);
    const isAlive = character.status === 'Alive';
    const isDead = character.status === 'Dead';
    const statusColor = isAlive ? 'bg-green-500' : isDead ? 'bg-red-500' : 'bg-gray-500';

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={onClose} 
        >
            <div
                className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative transition-colors duration-300 bg-white dark:bg-[#1a1c22]"
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 text-black dark:text-white bg-black/20 dark:bg-transparent rounded-full p-1.5 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="w-full h-72">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex flex-col flex-1">
                            <h2 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-green-400 truncate">
                                {character.name || 'Nome não disponível'}
                            </h2>

                            <div className="flex items-center gap-2.5 mt-2.5 text-[17px] font-semibold text-gray-700 dark:text-white">
                                <span className={`w-3.5 h-3.5 rounded-full ${statusColor} flex-shrink-0`}></span>
                                <span className="capitalize">{character.status} - {character.species}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                toggleFavorite(character.id);
                            }}
                            className="p-1.5 text-gray-400 hover:text-pink-400 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                        >
                            {favorited ? (
                                <svg data-testid="icon-favorited" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-pink-400 scale-110">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg data-testid="icon-favorited" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 hover:scale-110">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.151-.326.621-.326.772 0l2.036 4.633a.75.75 0 0 0 .563.408l4.904.469c.355.034.497.473.239.708l-3.565 3.257a.75.75 0 0 0-.213.656l1.079 4.88c.078.352-.309.634-.62.453l-4.337-2.32a.75.75 0 0 0-.697 0l-4.337 2.32c-.31.18-.688-.101-.62-.453l1.079-4.88a.75.75 0 0 0-.213-.656L3.42 10.43c-.258-.235-.116-.675.239-.708l4.904-.469a.75.75 0 0 0 .563-.408l2.036-4.633Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">

                        <div className="flex flex-col">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wide uppercase">Gênero</span>
                            <span className="text-gray-800 dark:text-white text-lg font-semibold mt-1 capitalize">{character.gender}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wide uppercase">Aparições</span>
                            <span className="text-gray-800 dark:text-white text-lg font-semibold mt-1">{character.episode.length} episódios</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wide uppercase">Origem</span>
                            <span className="text-gray-800 dark:text-white text-lg font-semibold mt-1 truncate">{character.origin.name}</span>
                        </div>

                        <div className="flex flex-col col-span-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wide uppercase">Localização Atual</span>
                            <span className="text-gray-800 dark:text-white text-lg font-semibold mt-1 truncate">{character.location.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}