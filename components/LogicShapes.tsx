
import React, { useState, useEffect } from 'react';
import { speakInstruction } from '../services/geminiService';

const SHAPES = [
  { id: 'circle', name: 'Cercle', icon: '⭕', color: 'text-red-500' },
  { id: 'square', name: 'Carré', icon: '🟦', color: 'text-blue-500' },
  { id: 'triangle', name: 'Triangle', icon: '▲', color: 'text-green-500' },
];

export default function LogicShapes({ onBack, onSuccess }: { onBack: () => void, onSuccess: () => void }) {
  const [target, setTarget] = useState(SHAPES[0]);
  const [level, setLevel] = useState<'SHAPES' | 'SIZE'>('SHAPES');

  useEffect(() => {
    if (level === 'SHAPES') speakInstruction(`Touche le ${target.name} !`);
    else speakInstruction("Touche l'objet le plus grand.");
  }, [target, level]);

  const handleShape = (id: string) => {
    if (id === target.id) {
      if (level === 'SHAPES') setLevel('SIZE');
      else onSuccess();
    } else {
      speakInstruction("Non, essaie encore !");
    }
  };

  return (
    <div className="flex flex-col items-center h-full p-6 space-y-8">
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="p-4 bg-red-400 border-b-4 border-red-600 rounded-2xl text-white font-bold shadow-lg">🏠 Menu</button>
        <span className="text-2xl font-bold text-purple-600">Pôle Logique</span>
      </div>

      {level === 'SHAPES' ? (
        <div className="flex flex-col items-center space-y-12">
          <div className="text-center bg-white p-8 rounded-3xl shadow-lg border-2 border-purple-100">
            <h2 className="text-4xl font-bold text-gray-700">Où est le {target.name} ?</h2>
          </div>
          <div className="flex gap-8">
            {SHAPES.map(s => (
              <button
                key={s.id}
                onClick={() => handleShape(s.id)}
                className={`text-9xl hover:scale-110 active:scale-95 transition-transform p-10 bg-white rounded-[3rem] shadow-xl border-b-8 border-gray-100 ${s.color}`}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-12">
          <h2 className="text-4xl font-bold text-gray-700">Lequel est le plus grand ?</h2>
          <div className="flex items-end gap-12">
             <button onClick={() => speakInstruction("Non, celui-là est petit.")} className="text-6xl bg-white p-6 rounded-full shadow-lg border-b-4 border-gray-200">🐘</button>
             <button onClick={onSuccess} className="text-[12rem] bg-white p-10 rounded-[4rem] shadow-2xl border-b-8 border-gray-200 hover:scale-105 transition-all">🐘</button>
          </div>
        </div>
      )}
    </div>
  );
}
