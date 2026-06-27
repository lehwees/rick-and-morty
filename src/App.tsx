import { useEffect, useState } from 'react';
import { getCharacters } from './services/api';
import { Card } from './components/Card';
import type { Character } from './types/character';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError(false);
        const data = await getCharacters(1);
        setCharacters(data.results);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadCharacters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-xl font-bold">
        Carregando personagens...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400 text-xl font-bold">
        Houve um erro ao carregar os dados. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">

      <header className="mb-12 flex flex-col items-center justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
          alt="Rick and Morty Logo"
          className="w-full max-w-md h-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-pulse"
        />
        <p className="text-gray-400 mt-4 text-lg p-6 font-medium">Explore os personagens do multiverso</p>
      </header>

      <main className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6 justify-items-center">
        {characters.map((character) => (
          <Card
            key={character.id}
            character={character}
            onClick={() => console.log('Clicou no:', character.name)}
          />
        ))}
      </main>
    </div>
  );
}