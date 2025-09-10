import React from 'react';
import type { ReadingCard } from '../types';

interface ReadingViewProps {
  cards: ReadingCard[];
  reading: string;
  onReset: () => void;
}

// A simple component to format the reading text
const FormattedReading: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n').filter(p => p.trim() !== '');
    return (
        <div>
            {lines.map((line, index) => {
                if (line.startsWith('### ')) {
                    return <h2 key={index} className="text-3xl font-bold text-yellow-200 mt-8 mb-4">{line.substring(4)}</h2>;
                }
                if (line.startsWith('*   **') && line.endsWith('**')) {
                     return <h3 key={index} className="text-2xl font-semibold text-purple-200 mt-6 mb-2">{line.replace('*   **', '').slice(0, -2)}</h3>;
                }
                if (line.includes('과거:') || line.includes('현재:') || line.includes('미래:') || line.includes('종합:') || line.includes('서론:')) {
                    return <h3 key={index} className="text-2xl font-bold text-yellow-300 mt-6 mb-2">{line.replace(/(\d\.\s*)/, '')}</h3>;
                }
                return <p key={index} className="mb-4 text-purple-100 leading-relaxed">{line}</p>;
            })}
        </div>
    );
};

export const ReadingView: React.FC<ReadingViewProps> = ({ cards, reading, onReset }) => {
  const cardPositions = ['과거', '현재', '미래'];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-slate-800 to-purple-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-yellow-200 mb-8">
          당신의 운세
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-purple-200 mb-2">{cardPositions[index]}</h2>
              <div className="w-[180px] h-[300px] sm:w-[200px] sm:h-[340px] perspective-1000">
                <div
                  className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${
                    card.reversed ? 'rotate-180' : ''
                  }`}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-contain rounded-xl shadow-2xl shadow-purple-500/30"
                  />
                </div>
              </div>
              <p className="mt-4 text-center font-medium text-lg text-yellow-200">{card.name}</p>
              {card.reversed && <p className="text-sm text-purple-300">(역방향)</p>}
            </div>
          ))}
        </div>

        <div className="bg-black bg-opacity-30 p-6 sm:p-8 rounded-2xl border border-purple-500 shadow-lg">
            <FormattedReading text={reading} />
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onReset}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xl rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            다른 운세 보기
          </button>
        </div>
      </div>
    </div>
  );
};