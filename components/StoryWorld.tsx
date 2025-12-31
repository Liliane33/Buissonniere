
import React, { useState, useEffect } from 'react';
import { speakInstruction } from '../services/geminiService';
import Mascot from './Mascot';

const STORIES = [
  {
    id: 1,
    title: "L'Aventure du Petit Renard",
    icon: "🦊",
    scenes: [
      {
        text: "Petit Renard se réveille dans la forêt. Il voit deux chemins. Veut-il aller voir les fleurs ou la rivière ?",
        options: [
          { text: "Les fleurs 🌸", next: 1 },
          { text: "La rivière 🌊", next: 2 }
        ]
      },
      {
        id: 1,
        text: "Les fleurs sentent si bon ! Petit Renard rencontre une abeille. Ils dansent ensemble !",
        end: true
      },
      {
        id: 2,
        text: "L'eau de la rivière est fraîche. Petit Renard voit un petit poisson qui fait des bulles !",
        end: true
      }
    ]
  },
  {
    id: 2,
    title: "Le Voyage du Petit Nuage",
    icon: "☁️",
    scenes: [
      {
        text: "Petit Nuage s'ennuie dans le ciel. Il veut changer de forme. Doit-il devenir un gâteau ou un dinosaure ?",
        options: [
          { text: "Un Gâteau 🍰", next: 3 },
          { text: "Un Dinosaure 🦖", next: 4 }
        ]
      },
      {
        id: 3,
        text: "Miam ! Tout le monde a faim en regardant le ciel. Petit Nuage est content et fait tomber de la pluie sucrée !",
        end: true
      },
      {
        id: 4,
        text: "Grrr ! Petit Nuage fait un gros bruit de tonnerre rigolo. Les oiseaux s'envolent en riant !",
        end: true
      }
    ]
  },
  {
    id: 3,
    title: "La Baguette Magique",
    icon: "🪄",
    scenes: [
      {
        text: "Mascotte a trouvé une baguette magique. Elle veut transformer son goûter. Doit-elle transformer sa pomme en chocolat ou en jouet ?",
        options: [
          { text: "En Chocolat 🍫", next: 5 },
          { text: "En Jouet 🧸", next: 6 }
        ]
      },
      {
        id: 5,
        text: "Abracadabra ! La pomme est devenue une montagne de chocolat. Quel délice pour tous les amis !",
        end: true
      },
      {
        id: 6,
        text: "Pouf ! C'est maintenant un ours en peluche tout doux. Mascotte lui fait un gros câlin.",
        end: true
      }
    ]
  }
];

export default function StoryWorld({ onBack }: { onBack: () => void }) {
  const [activeStory, setActiveStory] = useState<typeof STORIES[0] | null>(null);
  const [currentScene, setCurrentScene] = useState<any>(null);

  useEffect(() => {
    if (currentScene) {
      speakInstruction(currentScene.text);
    } else if (!activeStory) {
      speakInstruction("Choisis une histoire à écouter !");
    }
  }, [currentScene, activeStory]);

  const startStory = (story: typeof STORIES[0]) => {
    setActiveStory(story);
    setCurrentScene(story.scenes[0]);
  };

  const handleOption = (nextId: number) => {
    const next = activeStory?.scenes.find(s => s.id === nextId);
    if (next) setCurrentScene(next);
  };

  const reset = () => {
    setActiveStory(null);
    setCurrentScene(null);
  };

  if (!activeStory) {
    return (
      <div className="flex flex-col items-center h-full p-6 space-y-8 bg-yellow-50 overflow-y-auto">
        <div className="w-full flex justify-between items-center">
          <button onClick={onBack} className="p-4 bg-red-400 border-b-4 border-red-600 rounded-2xl text-white font-bold shadow-lg">🏠 Menu</button>
          <span className="text-3xl font-bold text-yellow-600">Bibliothèque</span>
        </div>
        
        <Mascot size="md" expression="happy" />
        <h2 className="text-3xl font-bold text-gray-700 text-center">Quelle histoire veux-tu écouter ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {STORIES.map(s => (
            <button
              key={s.id}
              onClick={() => startStory(s)}
              className="p-8 bg-white border-b-8 border-yellow-500 rounded-[2.5rem] shadow-xl hover:scale-105 transition-all flex flex-col items-center gap-4 group"
            >
              <span className="text-7xl group-hover:animate-bounce">{s.icon}</span>
              <span className="text-xl font-bold text-gray-800 text-center leading-tight">{s.title}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full p-6 space-y-8 bg-yellow-50">
      <div className="w-full flex justify-between items-center">
        <button onClick={reset} className="p-4 bg-yellow-500 border-b-4 border-yellow-700 rounded-2xl text-white font-bold shadow-lg">📚 Bibliothèque</button>
        <span className="text-2xl font-bold text-yellow-600 italic">{activeStory.title}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-2xl w-full">
        <div className="relative">
          <Mascot size="lg" expression="talking" />
          <div className="absolute -top-10 -left-10 text-6xl animate-pulse">✨</div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border-4 border-yellow-200 text-center relative w-full">
          <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed italic">
            "{currentScene?.text}"
          </p>
          <button onClick={() => speakInstruction(currentScene?.text || "")} className="mt-4 text-yellow-500 hover:scale-110 transition-transform font-bold flex items-center gap-2 mx-auto">
             <span>🔊</span> Réécouter
          </button>
        </div>

        {currentScene && !currentScene.end ? (
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
            {currentScene.options?.map((opt: any, i: number) => (
              <button
                key={i}
                onClick={() => handleOption(opt.next)}
                className="p-6 md:p-8 bg-white border-b-8 border-yellow-500 rounded-3xl text-lg md:text-2xl font-bold text-gray-700 shadow-xl hover:bg-yellow-100 transition-colors active:translate-y-2 active:border-b-0"
              >
                {opt.text}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={reset}
            className="p-8 bg-green-400 border-b-8 border-green-600 rounded-3xl text-3xl font-bold text-white shadow-xl px-16 hover:scale-105 transition-transform"
          >
            Fin de l'histoire ✨
          </button>
        )}
      </div>
    </div>
  );
}
