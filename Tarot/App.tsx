import React, { useState, useCallback } from 'react';
import { CardSelector } from './components/CardSelector';
import { ReadingView } from './components/ReadingView';
import { QueryModal } from './components/QueryModal';
import { getTarotReading } from './services/geminiService';
import type { ReadingCard } from './types';
import { TAROT_DECK } from './constants';

enum AppState {
  SELECTING,
  AWAITING_QUERY,
  LOADING,
  READING,
  ERROR,
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SELECTING);
  const [readingCards, setReadingCards] = useState<ReadingCard[]>([]);
  const [readingText, setReadingText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const shuffleAndDraw = (): ReadingCard[] => {
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, 3);
    return drawn.map(card => ({
      ...card,
      reversed: Math.random() > 0.5,
    }));
  };

  const handleCardsSelected = useCallback(() => {
    const drawnCards = shuffleAndDraw();
    setReadingCards(drawnCards);
    setAppState(AppState.AWAITING_QUERY);
  }, []);

  const handleGetReading = useCallback(async (query: string) => {
    setAppState(AppState.LOADING);
    try {
      const reading = await getTarotReading(readingCards, query);
      setReadingText(reading);
      setAppState(AppState.READING);
    } catch (err) {
      console.error(err);
      setError('지금은 정령들이 침묵하고 있어요. 나중에 다시 시도해 주세요.');
      setAppState(AppState.ERROR);
    }
  }, [readingCards]);

  const handleReset = () => {
    setAppState(AppState.SELECTING);
    setReadingCards([]);
    setReadingText('');
    setError('');
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.SELECTING:
        return <CardSelector onSelectionComplete={handleCardsSelected} />;
      case AppState.AWAITING_QUERY:
        return <QueryModal cards={readingCards} onGetReading={handleGetReading} />;
      case AppState.LOADING:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 p-4 text-white">
            <h2 className="text-2xl font-bold text-yellow-200 mb-6 tracking-wide">
              선택하신 세 장의 운명 카드
            </h2>
            <div className="flex justify-center gap-4 sm:gap-6 mb-8">
              {readingCards.map((card, index) => {
                const positions = ['과거', '현재', '미래'];
                return (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-purple-300 mb-1">{positions[index]}</span>
                    <div className="w-24 h-40 sm:w-28 sm:h-44 rounded-lg overflow-hidden border-2 border-purple-400 shadow-xl shadow-purple-500/40 bg-gray-950">
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('jsdelivr')) {
                            target.src = 'https://cdn.jsdelivr.net/gh/metabismuth/tarot-json@master' + card.imageUrl;
                          }
                        }}
                        className={`w-full h-full object-cover ${card.reversed ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                    <span className="mt-1.5 text-xs text-yellow-200 font-medium max-w-[100px] truncate">{card.name}</span>
                    {card.reversed && <span className="text-[11px] text-pink-300">(역방향)</span>}
                  </div>
                );
              })}
            </div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-lg text-purple-200 tracking-wider animate-pulse font-medium">
              정령들이 카드의 흐름을 읽고 운세를 해석하는 중입니다...
            </p>
          </div>
        );
      case AppState.READING:
        return <ReadingView cards={readingCards} reading={readingText} onReset={handleReset} />;
      case AppState.ERROR:
         return (
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-red-900">
            <p className="text-2xl text-red-200">{error}</p>
            <button
              onClick={handleReset}
              className="mt-8 px-8 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              다시 시도
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="min-h-screen w-full">{renderContent()}</div>;
};

export default App;