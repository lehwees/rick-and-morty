import type { Character } from '../types/character';

interface CardProps {
    character: Character;
    onClick: () => void;
};

export function Card({ character, onClick }: CardProps) {
    const isAlive = character.status === 'Alive';
    const isDead = character.status === 'Dead';
    const statusColor = isAlive ? 'bg-green-500' : isDead ? 'bg-red-500' : 'bg-gray-500';

    return (
        <div
            onClick={onClick}
            className="flex flex-row bg-[#3c3e44] text-white rounded-lg overflow-hidden shadow-xl border border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] w-full max-w-[600px] h-[220px]"
        >
            <div className="w-[35%] h-full flex-shrink-0">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="w-[65%] p-5 pl-7 flex flex-col justify-between h-full min-w-0">
                <div className="flex flex-col gap-1.5">
                    <h3 className="font-extrabold text-white text-[24px] leading-tight hover:text-orange-400 transition-colors truncate">
                        {character.name}
                    </h3>

                    <div className="flex items-center gap-2 text-[16px] font-semibold text-white">
                        <span className={`w-3 h-3 rounded-full ${statusColor} flex-shrink-0`}></span>
                        <span className="capitalize">{character.status} - {character.species}</span>
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <span className="text-gray-400 text-[14px] font-bold tracking-wide">Last known location:</span>
                    <span className="text-gray-100 text-[16px] font-medium mt-0.5 truncate">{character.location.name}</span>
                </div>

                <div className="flex flex-col mt-2">
                    <span className="text-gray-400 text-[14px] font-bold tracking-wide">First seen in:</span>
                    <span className="text-gray-100 text-[16px] font-medium mt-0.5 truncate">
                        {character.origin.name}
                    </span>
                </div>
            </div>
        </div>
    );
}