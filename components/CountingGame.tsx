
import React, { useState, useEffect } from 'react';
import { speakInstruction } from '../services/geminiService';

interface CountingGameProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CountingGame: React.FC<CountingGameProps> = ({ onBack, onSuccess }) => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 20) + 1);
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    speakInstruction(`Touche les objets pour en compter ${targetNumber}.`);
  }, [targetNumber]);

  const handleBallClick = () => {
    if (currentCount < targetNumber) {
      const next = currentCount + 1;
      setCurrentCount(next);
      speakInstruction(`${next}`);
      if (next === targetNumber) {
        setTimeout(onSuccess, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-full p-4 space-y-4 overflow-y-auto bg-green-50/50">
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="p-3 bg-red-400 border-b-4 border-red-600 rounded-xl text-white font-bold shadow-md text-sm md:text-base">🏠 Retour</button>
        <div className="text-xl md:text-2xl font-bold text-green-600">Compte jusqu'à {targetNumber}</div>
      </div>

      <div className="text-center flex items-center gap-4 bg-white/80 px-6 py-2 rounded-2xl shadow-sm border border-green-100">
        <div className="text-4xl md:text-6xl font-black text-green-500">
          {targetNumber}
        </div>
        <div className="text-left">
           <p className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Cible</p>
           <p className="text-base font-bold text-gray-700">Touche les ballons !</p>
        </div>
      </div>

      <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2 md:gap-3 w-full max-w-4xl bg-white/40 p-4 md:p-6 rounded-[2rem] shadow-inner border border-white">
        {[...Array(targetNumber)].map((_, i) => (
          <button
            key={i}
            onClick={handleBallClick}
            disabled={i < currentCount}
            className={`aspect-square rounded-full text-xl md:text-3xl flex items-center justify-center transition-all shadow-sm
              ${i < currentCount 
                ? 'bg-green-100 grayscale opacity-20 scale-75 rotate-12 cursor-default' 
                : 'bg-red-400 hover:scale-110 active:scale-90 border-b-2 md:border-b-4 border-red-600 animate-pulse'}
            `}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            🎈
          </button>
        ))}
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-2">
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden shadow-inner border border-white">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${(currentCount / targetNumber) * 100}%` }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-1">
           {[...Array(currentCount)].map((_, i) => (
             <div key={i} className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: `${i * 0.05}s`}}></div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CountingGame;
