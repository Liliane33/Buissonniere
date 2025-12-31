
import React, { useState, useEffect } from 'react';
import { speakInstruction } from '../services/geminiService';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const BUBBLE_COLORS = [
  'bg-red-400 border-red-200',
  'bg-blue-400 border-blue-200',
  'bg-green-400 border-green-200',
  'bg-yellow-400 border-yellow-200',
  'bg-pink-400 border-pink-200',
  'bg-purple-400 border-purple-200',
  'bg-orange-400 border-orange-200',
];

export default function SkillZone({ onBack, onSuccess }: { onBack: () => void, onSuccess: () => void }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [popped, setPopped] = useState(0);

  useEffect(() => {
    speakInstruction("Éclate toutes les bulles colorées avec ton doigt !");
    generateBubbles();
  }, []);

  const generateBubbles = () => {
    const newBubbles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      size: Math.random() * 50 + 70, // Légèrement plus grandes
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]
    }));
    setBubbles(newBubbles);
  };

  const handlePop = (id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setPopped(p => {
      const next = p + 1;
      if (next === 8) {
        setTimeout(onSuccess, 500);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gradient-to-b from-blue-100 to-white">
      <div className="p-6 flex justify-between items-center z-20">
        <button onClick={onBack} className="p-4 bg-red-400 border-b-4 border-red-600 rounded-2xl text-white font-bold shadow-lg">🏠 Menu</button>
        <div className="text-3xl font-black text-orange-500 bg-white px-8 py-2 rounded-full shadow-md border-2 border-orange-100">
          {popped} / 8 🫧
        </div>
      </div>

      <div className="flex-1 relative">
        {bubbles.map(b => (
          <button
            key={b.id}
            onClick={() => handlePop(b.id)}
            style={{ 
              left: `${b.x}%`, 
              top: `${b.y}%`, 
              width: `${b.size}px`, 
              height: `${b.size}px`,
              animationDelay: `${b.id * 0.2}s`
            }}
            className={`absolute rounded-full ${b.color} border-4 shadow-xl animate-bounce hover:scale-125 transition-transform active:scale-0 cursor-pointer flex items-center justify-center overflow-hidden`}
          >
            {/* Reflet de la bulle pour l'effet 3D */}
            <div className="absolute top-2 left-4 w-1/3 h-1/4 bg-white/40 rounded-full blur-[2px]" />
            <div className="absolute bottom-2 right-4 w-1/4 h-1/4 bg-black/10 rounded-full blur-[4px]" />
          </button>
        ))}
      </div>
      
      <div className="p-8 text-center z-20">
        <p className="text-3xl font-black text-blue-600 animate-pulse drop-shadow-sm uppercase tracking-wider">Touche les bulles !</p>
      </div>
    </div>
  );
}
