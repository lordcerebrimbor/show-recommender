import React, { useState } from 'react';
import { ShowRecommendation } from './types';
import { getShowRecommendations } from './services/geminiService';
import ShowInputForm from './components/ShowInputForm';
import RecommendationCard from './components/RecommendationCard';

const App: React.FC = () => {
  const [recommendations, setRecommendations] = useState<ShowRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedShow, setSearchedShow] = useState<string>('');

  const handleSearch = async (showName: string) => {
    if (!showName.trim()) return;

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setSearchedShow(showName);

    try {
      const results = await getShowRecommendations(showName);
      setRecommendations(results);
    } catch (err) {
      let message = 'uh oh, it broke. try a different show maybe?'; // Default message
      if (err instanceof Error) {
        const lowerCaseMessage = err.message.toLowerCase();
        if (lowerCaseMessage.includes('api key not valid')) {
          message = 'oops, my brain wiring is loose (invalid api key). my owner needs to fix it.';
        } else if (lowerCaseMessage.includes('safety')) {
          message = "whoa, that's a spicy one! my programming won't let me search for that.";
        } else if (lowerCaseMessage.includes('failed to fetch')) {
          message = "can't connect to the mothership (network error). check your internet?";
        } else if (lowerCaseMessage.includes('json') || lowerCaseMessage.includes('unexpected token')) {
            message = "the ai is speaking in tongues (bad response format). let's try that again.";
        }
      }
      setError(message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-6xl sm:text-7xl font-bold text-gray-100 tracking-wider">
          bored? watch this.
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          idk, tell me a show you like and i'll find something else.
        </p>
      </header>
      
      <main className="w-full max-w-3xl mx-auto flex-grow">
        <div className="mb-8">
          <ShowInputForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="mt-8">
          {isLoading && (
            <p className="text-center text-accent text-3xl animate-pulse">loading...</p>
          )}
          
          {error && <p className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">{error}</p>}

          {!isLoading && recommendations.length > 0 && (
            <div>
              <h2 className="text-3xl text-center mb-6">
                if you liked <span className="text-accent font-bold">{searchedShow}</span>, try these:
              </h2>
              <ul className="flex flex-col gap-6">
                {recommendations.map((show) => (
                  <RecommendationCard key={show.name} show={show} />
                ))}
              </ul>
            </div>
          )}

          {!isLoading && !error && recommendations.length === 0 && searchedShow === '' && (
            <div className="text-center text-gray-500 pt-16">
              <p className="text-2xl">just type a show in the box and hit 'go'.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;