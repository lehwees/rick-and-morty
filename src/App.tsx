import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCharacters } from './services/api';
import { Card } from './components/Card';
import type { Character } from './types/character';
import { Modal } from './components/Modal';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['characters', searchName, selectedStatus, selectedSpecies],
    queryFn: ({ pageParam = 1 }) =>
      getCharacters(pageParam, searchName, selectedStatus, selectedSpecies),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.info || !lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return Number(url.searchParams.get('page'));
    },
    retry: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const characters = data?.pages.flatMap((page) => page.results) || [];

  const handleLogoClick = () => {
    setInputValue('');
    setSearchName('');
    setSelectedStatus('');
    setSelectedSpecies('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300 p-8">
      <ThemeToggle />

      {isLoading && (
        <div className="flex h-[60vh] items-center justify-center text-xl font-bold">
          Carregando personagens...
        </div>
      )};

      {isError && !isLoading && (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center p-4">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-2">Houve um problema no multiverso</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">Não conseguimos sintonizar a API do Rick and Morty. Verifique sua conexão.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors border border-gray-300 dark:border-gray-700 cursor-pointer"
          >
            Tentar Novamente
          </button>
        </div>
      )};

      {!isLoading && !isError && (
        <>
          <header className="mb-8 flex flex-col items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
              alt="Rick and Morty Logo"
              onClick={handleLogoClick}
              className="w-full max-w-md h-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            />
            <p className="text-gray-600 dark:text-gray-400 mt-4 p-6 text-lg font-medium">Explore os personagens do multiverso</p>
          </header>

          <section className="max-w-[1920px] mx-auto mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="flex gap-2 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setSearchName(inputValue)}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors font-medium shadow-sm"
              />
              <button
                onClick={() => setSearchName(inputValue)}
                className="px-5 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-colors active:scale-95 shadow-lg shadow-green-900/20 cursor-pointer"
              >
                Buscar
              </button>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-52 px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-green-500 transition-colors font-medium cursor-pointer shadow-sm"
            >
              <option value="">Todos os Status</option>
              <option value="alive">Vivo (Alive)</option>
              <option value="dead">Morto (Dead)</option>
              <option value="unknown">Desconhecido</option>
            </select>

            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full sm:w-52 px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-green-500 transition-colors font-medium cursor-pointer shadow-sm"
            >
              <option value="">Todas as Espécies</option>
              <option value="human">Humano</option>
              <option value="alien">Alienígena</option>
              <option value="humanoid">Humanoide</option>
              <option value="robot">Robô</option>
              <option value="mythological creature">Criatura Mitológica</option>
            </select>
          </section>

          {characters.length === 0 ? (
            <div className="text-center mt-12 text-gray-500 dark:text-gray-400 text-xl font-medium flex flex-col items-center justify-center gap-2">
              <p>Nenhum habitante encontrado nesta dimensão... 🛸</p>
              <button
                onClick={handleLogoClick}
                className="text-green-600 dark:text-green-400 hover:underline text-sm font-semibold mt-2 cursor-pointer"
              >
                Limpar filtros e recomeçar
              </button>
            </div>
          ) : (
            <main className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6 justify-items-center">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                />
              ))}
            </main>
          )};

          <div ref={ref} className="w-full flex flex-col items-center justify-center h-20 mt-8 mb-12">
            {isFetchingNextPage && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-lg font-semibold animate-pulse">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                Abrindo novo portal de dados...
              </div>
            )}
            {!hasNextPage && characters.length > 0 && (
              <p className="text-gray-500 font-medium">Você chegou ao fim do multiverso!</p>
            )}
          </div>
        </>
      )};

      <Modal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
}