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
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-indigo-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-400"></div>
            <p className="mt-6 text-xl text-purple-200 tracking-wider">우주의 기운을 모으는 중...</p>
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