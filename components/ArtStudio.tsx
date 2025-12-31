
import React, { useState, useEffect } from 'react';
import { speakInstruction } from '../services/geminiService';

const COLORS = [
  { name: 'Rouge', color: '#EF4444', icon: '🍎' },
  { name: 'Bleu', color: '#3B82F6', icon: '🌊' },
  { name: 'Jaune', color: '#FACC15', icon: '☀️' },
  { name: 'Vert', color: '#22C55E', icon: '🌳' },
  { name: 'Orange', color: '#F97316', icon: '🥕' },
  { name: 'Violet', color: '#A855F7', icon: '🍇' },
  { name: 'Rose', color: '#EC4899', icon: '🌸' },
  { name: 'Marron', color: '#92400E', icon: '🐻' },
  { name: 'Gris', color: '#6B7280', icon: '🐘' },
  { name: 'Noir', color: '#1F2937', icon: '🐜' },
  { name: 'Doré', color: '#D97706', icon: '🏆' },
];

const NOTES = ['DO', 'RÉ', 'MI', 'FA', 'SOL'];

export default function ArtStudio({ onBack, onSuccess }: { onBack: () => void, onSuccess: () => void }) {
  const [mode, setMode] = useState<'COLORS' | 'MUSIC'>('COLORS');
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [nuance, setNuance] = useState<'NORMAL' | 'CLAIR' | 'FONCÉ'>('NORMAL');

  const getNuanceColor = (hex: string) => {
    if (nuance === 'CLAIR') return `${hex}cc`; // Opacité ou on pourrait utiliser HSL
    if (nuance === 'FONCÉ') return `${hex}`; // Idéalement manipuler la luminosité
    return hex;
  };

  useEffect(() => {
    if (mode === 'COLORS') {
      const nText = nuance !== 'NORMAL' ? ` ${nuance.toLowerCase()}` : '';
      speakInstruction(`C'est le ${currentColor.name}${nText}, comme ${currentColor.icon}`);
    } else {
      speakInstruction(`Fais de la musique avec le piano !`);
    }
  }, [currentColor, mode, nuance]);

  return (
    <div className="flex flex-col items-center h-full p-6 space-y-6 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="p-4 bg-red-400 border-b-4 border-red-600 rounded-2xl text-white font-bold shadow-lg">🏠 Menu</button>
        <div className="flex gap-2">
           <button onClick={() => setMode('COLORS')} className={`p-4 rounded-xl font-bold ${mode === 'COLORS' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>🎨 Couleurs</button>
           <button onClick={() => setMode('MUSIC')} className={`p-4 rounded-xl font-bold ${mode === 'MUSIC' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>🎹 Musique</button>
        </div>
      </div>

      {mode === 'COLORS' ? (
        <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-4">
             <div 
               className="w-48 h-48 rounded-[3rem] shadow-2xl flex items-center justify-center text-8xl animate-pulse transition-all duration-500"
               style={{ 
                 backgroundColor: currentColor.color,
                 filter: nuance === 'CLAIR' ? 'brightness(1.5)' : nuance === 'FONCÉ' ? 'brightness(0.5)' : 'none'
               }}
             >
               {currentColor.icon}
             </div>
             <h2 className="text-4xl font-bold text-gray-800 uppercase">
               {currentColor.name} {nuance !== 'NORMAL' && <span className="text-lg opacity-50">({nuance})</span>}
             </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-pink-100 w-full">
            <p className="text-center font-bold text-gray-500 mb-4 uppercase text-xs tracking-widest">Choisir une nuance</p>
            <div className="flex justify-center gap-4">
              {['CLAIR', 'NORMAL', 'FONCÉ'].map((n) => (
                <button
                  key={n}
                  onClick={() => setNuance(n as any)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${nuance === n ? 'bg-pink-500 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-400'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 p-4 bg-white/50 rounded-[2rem] shadow-inner">
            {COLORS.map(c => (
              <button
                key={c.name}
                onClick={() => setCurrentColor(c)}
                style={{ backgroundColor: c.color }}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-b-4 border-black/20 hover:scale-110 active:translate-y-1 transition-all shadow-md flex items-center justify-center text-2xl
                  ${currentColor.name === c.name ? 'ring-4 ring-pink-300 ring-offset-2' : ''}
                `}
              >
                {/* On n'affiche l'icône que sur le bouton sélectionné pour plus de clarté */}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-12">
           <div className="flex gap-2 bg-gray-800 p-4 rounded-3xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-4 bg-gray-700"></div>
             {NOTES.map(note => (
               <button
                 key={note}
                 onClick={() => speakInstruction(note)}
                 className="w-16 h-56 md:w-20 md:h-64 bg-white hover:bg-gray-100 active:bg-blue-100 rounded-b-xl border-x border-gray-300 flex flex-col justify-end p-4 font-bold text-gray-400 text-xl transition-colors"
               >
                 {note}
               </button>
             ))}
           </div>
           <p className="text-2xl font-bold text-gray-600 animate-pulse">Touche les touches pour chanter !</p>
        </div>
      )}
    </div>
  );
}
