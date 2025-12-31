
import React, { useState, useEffect } from 'react';
import { speakInstruction } from '../services/geminiService';

const SIGNS = [
  { symbol: '+', label: 'Plus', description: 'On ajoute !', color: 'bg-green-500', border: 'border-green-700', icon: '➕' },
  { symbol: '-', label: 'Moins', description: 'On enlève !', color: 'bg-red-500', border: 'border-red-700', icon: '➖' },
  { symbol: '=', label: 'Égal', description: 'C\'est le résultat !', color: 'bg-yellow-500', border: 'border-yellow-700', icon: '🟰' },
  { symbol: 'x', label: 'Fois', description: 'C\'est le double !', color: 'bg-blue-500', border: 'border-blue-700', icon: '✖️' },
  { symbol: '÷', label: 'Diviser', description: 'On partage !', color: 'bg-purple-500', border: 'border-purple-700', icon: '➗' },
];

interface MathLabGameProps {
  onBack: () => void;
}

const MathLabGame: React.FC<MathLabGameProps> = ({ onBack }) => {
  const [selectedSign, setSelectedSign] = useState(SIGNS[0]);

  useEffect(() => {
    speakInstruction(`Voici le signe ${selectedSign.label}. ${selectedSign.description}`);
  }, [selectedSign]);

  const renderVisual = () => {
    switch (selectedSign.symbol) {
      case '+':
        return (
          <div className="flex items-center gap-4 text-6xl">
            <span>🍎🍎</span>
            <span className="text-green-500 font-bold">+</span>
            <span>🍎</span>
            <span className="text-4xl text-gray-400">=</span>
            <span>🍎🍎🍎</span>
          </div>
        );
      case '-':
        return (
          <div className="flex items-center gap-4 text-6xl">
            <span>🍎🍎🍎</span>
            <span className="text-red-500 font-bold">-</span>
            <span className="opacity-30">🍎</span>
            <span className="text-4xl text-gray-400">=</span>
            <span>🍎🍎</span>
          </div>
        );
      case 'x':
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 text-6xl">
               <div className="border-2 border-blue-200 p-2 rounded-xl">🍎🍎</div>
               <div className="border-2 border-blue-200 p-2 rounded-xl">🍎🍎</div>
            </div>
            <div className="text-xl font-bold text-blue-600 uppercase">2 Paquets de 2</div>
          </div>
        );
      case '÷':
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl flex gap-8">
               <div className="flex flex-col items-center">
                 <span className="text-2xl">👦</span>
                 <span>🍎🍎</span>
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-2xl">👧</span>
                 <span>🍎🍎</span>
               </div>
            </div>
            <div className="text-xl font-bold text-purple-600 uppercase">On partage en 2</div>
          </div>
        );
      default:
        return <div className="text-6xl">🤔</div>;
    }
  };

  return (
    <div className="flex flex-col items-center h-full p-6 space-y-8">
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="p-4 bg-red-400 border-b-4 border-red-600 rounded-2xl text-white font-bold shadow-lg">🏠 Retour</button>
        <div className="text-3xl font-bold text-purple-600">Le Labo des Signes</div>
      </div>

      <div className="bg-white rounded-[3rem] p-12 shadow-2xl w-full max-w-2xl flex flex-col items-center space-y-8 border-4 border-purple-100">
        <div className={`w-32 h-32 ${selectedSign.color} rounded-full flex items-center justify-center text-7xl text-white shadow-xl`}>
          {selectedSign.symbol}
        </div>
        <div className="text-center">
           <h2 className="text-4xl font-bold text-gray-800 mb-2">{selectedSign.label}</h2>
           <p className="text-2xl text-gray-500 font-semibold">{selectedSign.description}</p>
        </div>
        <div className="py-10">
          {renderVisual()}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {SIGNS.map(sign => (
          <button
            key={sign.symbol}
            onClick={() => setSelectedSign(sign)}
            className={`${sign.color} ${sign.border} border-b-8 p-6 rounded-2xl text-white text-4xl shadow-lg hover:scale-110 transition-all active:translate-y-2 active:border-b-0`}
          >
            {sign.symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MathLabGame;
