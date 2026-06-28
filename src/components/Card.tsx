import type { Character } from '../types/character';
import { useFavorites } from '../hooks/useFavorites';

interface CardProps {
    character: Character;
    onClick: () => void;
}

export function Card({ character, onClick }: CardProps) {
    const isAlive = character.status === 'Alive';
    const isDead = character.status === 'Dead';
    const statusColor = isAlive ? 'bg-green-500' : isDead ? 'bg-red-500' : 'bg-gray-500';
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorited = isFavorite(character.id);

    return (
        <div
            onClick={onClick}
            className="flex flex-row bg-white dark:bg-[#3c3e44] text-gray-800 dark:text-white rounded-lg overflow-hidden shadow-lg dark:shadow-xl border border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] w-full max-w-[600px] h-[220px]"
        >
            <div className="w-[35%] h-full flex-shrink-0">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";
                    }}
                />
            </div>

            <div className="w-[65%] p-5 pl-7 flex flex-col justify-between h-full min-w-0">
                <div className="flex flex-col gap-1.5">

                    <div className="flex items-start justify-between gap-2 w-full relative">
                        <h3 className="font-extrabold text-gray-900 dark:text-white text-[24px] leading-tight hover:text-pink-400 dark:hover:text-pink-400 transition-colors truncate flex-1">
                            {character.name}
                        </h3>

                        <button 
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(character.id);
                            }}
                            className="p-1 text-gray-400 hover:text-pink-400 transition-colors duration-200 flex-shrink-0 relative z-30 cursor-pointer"
                            title={favorited ? "Remover dos favoritos" : "Favoritar"}
                        >
                            {favorited ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pink-400 scale-110 transition-transform pointer-events-none">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 hover:scale-110 transition-transform pointer-events-none">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.151-.326.621-.326.772 0l2.036 4.633a.75.75 0 0 0 .563.408l4.904.469c.355.034.497.473.239.708l-3.565 3.257a.75.75 0 0 0-.213.656l1.079 4.88c.078.352-.309.634-.62.453l-4.337-2.32a.75.75 0 0 0-.697 0l-4.337 2.32c-.31.18-.688-.101-.62-.453l1.079-4.88a.75.75 0 0 0-.213-.656L3.42 10.43c-.258-.235-.116-.675.239-.708l4.904-.469a.75.75 0 0 0 .563-.408l2.036-4.633Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-[16px] font-semibold text-gray-700 dark:text-white">
                        <span className={`w-3 h-3 rounded-full ${statusColor} flex-shrink-0`}></span>
                        <span className="capitalize">{character.status} - {character.species}</span>
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <span className="text-gray-400 dark:text-gray-400 text-[14px] font-bold tracking-wide">Last known location:</span>
                    <span className="text-gray-800 dark:text-gray-100 text-[16px] font-medium mt-0.5 truncate">{character.location.name}</span>
                </div>

                <div className="flex flex-col mt-2">
                    <span className="text-gray-400 dark:text-gray-400 text-[14px] font-bold tracking-wide">First seen in:</span>
                    <span className="text-gray-800 dark:text-gray-100 text-[16px] font-medium mt-0.5 truncate">
                        {character.origin.name}
                    </span>
                </div>
            </div>
        </div>
    );
}