import React, { useState } from 'react';

interface ShowInputFormProps {
  onSearch: (showName: string) => void;
  isLoading: boolean;
}

const ShowInputForm: React.FC<ShowInputFormProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="e.g., stranger things, the bear..."
        className="flex-grow w-full px-4 py-3 bg-base-200 border-2 border-base-300 rounded-none focus:ring-2 focus:ring-accent focus:outline-none text-lg"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue}
        className="w-full sm:w-auto px-8 py-3 font-bold text-white bg-accent rounded-none hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {isLoading ? 'uhhh thinking...' : 'go'}
      </button>
    </form>
  );
};

export default ShowInputForm;