import React, { useState } from 'react';

interface CardSelectorProps {
  onSelectionComplete: () => void;
}

const CardBack = 'https://picsum.photos/id/1043/400/600';

const TarotCard: React.FC<{
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  style: React.CSSProperties;
}> = ({ index, isSelected, onSelect, style }) => {
  return (
    <div
      className="absolute w-[100px] h-[170px] md:w-[130px] md:h-[220px] transition-transform duration-300 ease-in-out cursor-pointer"
      style={style}
      onClick={() => onSelect(index)}
    >
      <img
        src={CardBack}
        alt="Tarot Card Back"
        className={`w-full h-full object-cover rounded-lg border-2 ${
          isSelected ? 'border-yellow-400 scale-105 shadow-yellow-400/50' : 'border-purple-300'
        } shadow-lg hover:-translate-y-4 hover:scale-105 transition-all duration-300`}
      />
    </div>
  );
};

const CardLayer: React.FC<{
    cardCount: number;
    yOffset: number;
    totalAngle: number;
    zIndex: number;
    startIndex: number;
    selectedCards: number[];
    onSelectCard: (index: number) => void;
}> = ({ cardCount, yOffset, totalAngle, zIndex, startIndex, selectedCards, onSelectCard }) => {
    const anglePerCard = totalAngle / (cardCount - 1);

    return (
        <div className="absolute inset-0 flex justify-center items-end" style={{ perspective: '1000px'}}>
            {Array.from({ length: cardCount }).map((_, i) => {
                const cardIndex = startIndex + i;
                const angle = (i * anglePerCard) - (totalAngle / 2);
                const isSelected = selectedCards.includes(cardIndex);

                const style: React.CSSProperties = {
                    transform: `rotate(${angle}deg) translateY(${yOffset}px) ${isSelected ? 'translateY(-20px)' : ''}`,
                    transformOrigin: 'bottom center',
                    zIndex: zIndex + i,
                };

                return (
                    <TarotCard
                        key={cardIndex}
                        index={cardIndex}
                        isSelected={isSelected}
                        onSelect={onSelectCard}
                        style={style}
                    />
                );
            })}
        </div>
    );
};


export const CardSelector: React.FC<CardSelectorProps> = ({ onSelectionComplete }) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleSelectCard = (index: number) => {
    setSelectedCards(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      if (prev.length < 3) {
        return [...prev, index];
      }
      return prev;
    });
  };

  const layers = [
    { cardCount: 26, yOffset: 150, totalAngle: 120, zIndex: 10, startIndex: 0 },
    { cardCount: 26, yOffset: 50, totalAngle: 100, zIndex: 40, startIndex: 26 },
    { cardCount: 26, yOffset: -50, totalAngle: 80, zIndex: 70, startIndex: 52 },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4">
      <div className="text-center z-[100] mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-yellow-200">
          운명의 카드를 선택하세요
        </h1>
        <p className="mt-2 text-lg text-purple-200">당신의 길을 밝혀줄 세 장의 카드를 선택하세요.</p>
      </div>

      <div className="relative w-full h-[60vh] md:h-[70vh]">
         {layers.map((layer, idx) => (
             <CardLayer 
                key={idx}
                {...layer}
                selectedCards={selectedCards}
                onSelectCard={handleSelectCard}
             />
         ))}
      </div>

      <div className="z-[100] mb-8">
        <button
          onClick={onSelectionComplete}
          disabled={selectedCards.length !== 3}
          className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold text-xl rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {selectedCards.length === 3 ? '운세 보기' : `${3 - selectedCards.length}장 더 선택하세요...`}
        </button>
      </div>
    </div>
  );
};