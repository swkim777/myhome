import React, { useState } from 'react';
import type { ReadingCard } from '../types';

interface QueryModalProps {
  cards: ReadingCard[];
  onGetReading: (query: string) => void;
}

export const QueryModal: React.FC<QueryModalProps> = ({ cards, onGetReading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetReading(query);
  };

  const handleSkip = () => {
    onGetReading('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[200]">
      <div className="bg-gradient-to-br from-gray-800 to-indigo-900 border border-purple-500 rounded-2xl shadow-2xl p-8 w-11/12 max-w-2xl text-white animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-yellow-200 mb-6">
          더 자세한 운세를 받아보세요
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          {cards.map((card, index) => (
            <div key={index} className="w-24 h-40">
              <img
                src={card.imageUrl}
                alt={card.name}
                className={`w-full h-full object-cover rounded-lg shadow-lg shadow-purple-500/30 ${
                  card.reversed ? 'transform rotate-180' : ''
                }`}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-purple-200 mb-4">
          알고 싶은 점에 대해 구체적으로 질문하면 더욱 깊이 있는 해석을 받을 수 있습니다. (예: 연애, 직업, 건강)
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-24 p-3 bg-gray-900 bg-opacity-50 border border-purple-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            placeholder="여기에 질문을 입력하세요..."
          />
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              운세 보기
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-300 font-bold rounded-full shadow-lg hover:bg-purple-500 hover:text-white transform transition-all duration-300"
            >
              건너뛰기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};