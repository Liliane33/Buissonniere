
import React, { useState, useEffect } from 'react';
import { speakInstruction, resumeAudioIfNeeded } from '../services/geminiService';
import Mascot from './Mascot';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WORDS: Record<string, { word: string, icon: string }> = {
  A: { word: "Abeille", icon: "🐝" },
  B: { word: "Bateau", icon: "⛵" },
  C: { word: "Cochon", icon: "🐷" },
  D: { word: "Dauphin", icon: "🐬" },
  E: { word: "Éléphant", icon: "🐘" },
  F: { word: "Fleur", icon: "🌸" },
  G: { word: "Girafe", icon: "🦒" },
  H: { word: "Hibou", icon: "🦉" },
  I: { word: "Île", icon: "🏝️" },
  J: { word: "Jardin", icon: "🏡" },
  K: { word: "Kangourou", icon: "🦘" },
  L: { word: "Lion", icon: "🦁" },
  M: { word: "Maison", icon: "🏠" },
  N: { word: "Nuage", icon: "☁️" },
  O: { word: "Oiseau", icon: "🐦" },
  P: { word: "Pomme", icon: "🍎" },
  Q: { word: "Quilles", icon: "🎳" },
  R: { word: "Robot", icon: "🤖" },
  S: { word: "Soleil", icon: "☀️" },
  T: { word: "Train", icon: "🚂" },
  U: { word: "Usine", icon: "🏭" },
  V: { word: "Vélo", icon: "🚲" },
  W: { word: "Wagon", icon: "🚃" },
  X: { word: "Xylophone", icon: "🎹" },
  Y: { word: "Yoyo", icon: "🪀" },
  Z: { word: "Zèbre", icon: "🦓" },
};

interface AlphabetGameProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AlphabetGame: React.FC<AlphabetGameProps> = ({ onBack, onSuccess }) => {
  const [index, setIndex] = useState(0);
  const [isReacting, setIsReacting] = useState(false);
  const letter = ALPHABET[index];
  const { word, icon } = WORDS[letter] || { word: "", icon: "❓" };

  useEffect(() => {
    const text = `C'est la lettre ${letter}. ${letter} comme ${word}.`;
    speakInstruction(text);
    triggerReaction();
  }, [letter]);

  const triggerReaction = () => {
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 1000);
  };

  const nextLetter = async () => {
    await resumeAudioIfNeeded();
    if (index < ALPHABET.length - 1) {
      setIndex(index + 1);
    } else {
      onSuccess();
    }
  };

  const prevLetter = async () => {
    await resumeAudioIfNeeded();
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="flex flex-col items-center h-full p-6 space-y-4 md:space-y-8 overflow-y-auto bg-blue-50/30">
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="p-4 bg-red-400 border-b-4 border-red-600 rounded-2xl text-white font-bold shadow-lg z-10">🏠 Retour</button>
        <div className="text-2xl font-bold text-blue-600 bg-white/80 px-6 py-2 rounded-full border border-blue-100 shadow-sm">L'Abécédaire</div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-white/80 p-6 md:p-10 rounded-[3rem] shadow-xl border-4 border-white w-full max-w-5xl">
        
        {/* Zone de la Lettre avec le Petit Compagnon */}
        <div className="relative flex flex-col items-center">
          {/* Le Petit Compagnon qui réagit */}
          <div className={`absolute -left-16 md:-left-24 bottom-0 transition-all duration-500 transform ${isReacting ? '-translate-y-12 scale-110' : 'translate-y-0'}`}>
             <div className="relative">
                {/* Effet d'étoiles quand il réagit */}
                {isReacting && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2">
                    <span className="animate-ping text-yellow-400 text-2xl">⭐</span>
                    <span className="animate-bounce text-pink-400 text-2xl" style={{animationDelay: '0.1s'}}>❤️</span>
                    <span className="animate-ping text-blue-400 text-2xl" style={{animationDelay: '0.2s'}}>⭐</span>
                  </div>
                )}
                {/* Personnage Enfant */}
                <div className="text-7xl md:text-8xl filter drop-shadow-md">👦</div>
                <div className={`absolute top-4 -right-4 text-4xl transition-transform ${isReacting ? 'rotate-12 scale-125' : 'rotate-0'}`}>👋</div>
             </div>
             <p className="text-xs font-bold text-blue-400 mt-2 bg-blue-50 px-2 py-1 rounded-full text-center">Ton Ami</p>
          </div>

          <div className={`text-[10rem] md:text-[14rem] font-bold text-blue-500 drop-shadow-2xl leading-none transition-transform duration-300 ${isReacting ? 'scale-105' : 'scale-100'}`}>
            {letter}
          </div>
          
          <button 
            onClick={() => { triggerReaction(); speakInstruction(letter); }}
            className="mt-4 p-4 bg-blue-500 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg border-b-4 border-blue-700 flex items-center gap-2"
          >
            <span className="text-2xl">🔊</span> <span className="font-bold">ÉCOUTER</span>
          </button>
        </div>

        {/* Zone de l'Image et Mascotte */}
        <div className="flex-1 flex flex-col items-center space-y-4 md:space-y-6">
          <div className={`text-9xl md:text-[10rem] transition-all duration-500 ${isReacting ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`}>
            {icon}
          </div>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight uppercase">{word}</h2>
            <div className="h-2 w-full bg-blue-100 rounded-full mt-2 overflow-hidden">
               <div className={`h-full bg-blue-500 transition-all duration-1000 ${isReacting ? 'w-full' : 'w-0'}`}></div>
            </div>
          </div>
          <Mascot size="md" expression={isReacting ? "talking" : "happy"} />
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-lg pt-4">
        <button 
          disabled={index === 0}
          onClick={prevLetter}
          className="p-6 bg-white border-b-8 border-gray-300 rounded-3xl text-4xl disabled:opacity-30 shadow-lg active:border-b-0 active:translate-y-2 transition-all"
        >
          ⬅️
        </button>
        <button 
          onClick={nextLetter}
          className="p-6 bg-green-400 border-b-8 border-green-600 rounded-3xl text-white text-2xl font-bold shadow-lg hover:scale-105 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3"
        >
          {index === ALPHABET.length - 1 ? "BRAVO ! 🏁" : <span>SUIVANT <span className="text-3xl">➡️</span></span>}
        </button>
      </div>

      {/* Barre de progression discrète en bas */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-blue-400 transition-all duration-300" 
          style={{ width: `${((index + 1) / ALPHABET.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default AlphabetGame;
