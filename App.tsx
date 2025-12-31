
import React, { useState, useEffect } from 'react';
import { Category, View } from './types';
import Mascot from './components/Mascot';
import ParentalGate from './components/ParentalGate';
import { speakInstruction, stopSpeaking, resumeAudioIfNeeded } from './services/geminiService';
import AlphabetGame from './components/AlphabetGame';
import CountingGame from './components/CountingGame';
import MathLabGame from './components/MathLabGame';
import ArtStudio from './components/ArtStudio';
import LogicShapes from './components/LogicShapes';
import StoryWorld from './components/StoryWorld';
import SkillZone from './components/SkillZone';

const CATEGORIES = [
  { id: Category.Alphabet, label: 'Alphabet', icon: '🔤', color: 'bg-blue-400', border: 'border-blue-600', desc: 'A, B, C...' },
  { id: Category.Math, label: 'Nombres', icon: '🔢', color: 'bg-green-400', border: 'border-green-600', desc: '1, 2, 3 et plus' },
  { id: Category.Art, label: 'Couleurs', icon: '🎨', color: 'bg-pink-400', border: 'border-pink-600', desc: 'Dessin & Musique' },
  { id: Category.Logic, label: 'Logique', icon: '🧩', color: 'bg-purple-400', border: 'border-purple-600', desc: 'Formes & Puzzles' },
  { id: Category.Stories, label: 'Histoires', icon: '📚', color: 'bg-yellow-400', border: 'border-yellow-600', desc: 'Contes et Rêves' },
  { id: Category.Skills, label: 'Agilité', icon: '✨', color: 'bg-orange-400', border: 'border-orange-600', desc: 'Tracés & Bulles' },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('HOME');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [mathSubView, setMathSubView] = useState<'CHOICE' | 'COUNT' | 'LAB'>('CHOICE');
  const [showParentGate, setShowParentGate] = useState(false);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (view === 'HOME' && hasStarted) {
      speakInstruction("Bienvenue ! Choisis une activité pour t'amuser.");
    }
  }, [view, hasStarted]);

  const handleStart = async () => {
    await resumeAudioIfNeeded();
    setHasStarted(true);
  };

  const handleCategorySelect = async (cat: Category) => {
    await resumeAudioIfNeeded();
    stopSpeaking();
    setActiveCategory(cat);
    if (cat === Category.Math) setMathSubView('CHOICE');
    setView('GAME');
  };

  const handleCorrect = () => {
    stopSpeaking();
    setScore(s => s + 1);
    setView('SUCCESS');
    speakInstruction("Bravo ! C'est génial !");
    setTimeout(() => {
      setView('GAME');
    }, 2000);
  };

  const renderGame = () => {
    switch(activeCategory) {
      case Category.Alphabet: return <AlphabetGame onBack={() => { stopSpeaking(); setView('HOME'); }} onSuccess={handleCorrect} />;
      case Category.Math: 
        if (mathSubView === 'CHOICE') {
          return (
            <div className="h-full flex flex-col items-center justify-center p-6 space-y-8 bg-green-50">
               <button onClick={() => { stopSpeaking(); setView('HOME'); }} className="absolute top-6 left-6 p-4 bg-red-400 text-white rounded-2xl font-bold shadow-lg">🏠 Menu</button>
               <Mascot size="md" expression="happy" />
               <h2 className="text-4xl font-bold text-green-700">Que veux-tu faire ?</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                  <button onClick={() => { resumeAudioIfNeeded(); setMathSubView('COUNT'); }} className="p-10 bg-white border-b-8 border-green-500 rounded-[2.5rem] shadow-xl hover:scale-105 transition-all flex flex-col items-center gap-4">
                    <span className="text-7xl">🎈</span>
                    <span className="text-2xl font-bold text-gray-700">Compter (1-20)</span>
                  </button>
                  <button onClick={() => { resumeAudioIfNeeded(); setMathSubView('LAB'); }} className="p-10 bg-white border-b-8 border-purple-500 rounded-[2.5rem] shadow-xl hover:scale-105 transition-all flex flex-col items-center gap-4">
                    <span className="text-7xl">➕</span>
                    <span className="text-2xl font-bold text-gray-700">Le Labo des Signes</span>
                  </button>
               </div>
            </div>
          );
        }
        if (mathSubView === 'COUNT') return <CountingGame onBack={() => setMathSubView('CHOICE')} onSuccess={handleCorrect} />;
        return <MathLabGame onBack={() => setMathSubView('CHOICE')} />;
      
      case Category.Art: return <ArtStudio onBack={() => { stopSpeaking(); setView('HOME'); }} onSuccess={handleCorrect} />;
      case Category.Logic: return <LogicShapes onBack={() => { stopSpeaking(); setView('HOME'); }} onSuccess={handleCorrect} />;
      case Category.Stories: return <StoryWorld onBack={() => { stopSpeaking(); setView('HOME'); }} />;
      case Category.Skills: return <SkillZone onBack={() => { stopSpeaking(); setView('HOME'); }} onSuccess={handleCorrect} />;
      default: return null;
    }
  };

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 space-y-8">
        <Mascot size="lg" expression="happy" />
        <h1 className="text-5xl text-orange-600 text-center">L'École Buissonnière</h1>
        <button 
          onClick={handleStart}
          className="px-12 py-6 bg-orange-500 border-b-8 border-orange-700 text-white text-3xl font-bold rounded-[3rem] shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce"
        >
          C'est parti ! 🚀
        </button>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 overflow-y-auto bg-[#f0f9ff] selection:bg-orange-200">
      {view === 'HOME' && (
        <div className="min-h-full flex flex-col items-center py-12 px-6 space-y-10">
          <Mascot size="lg" expression="happy" />
          <h1 className="text-5xl md:text-6xl text-orange-600 text-center drop-shadow-sm">L'École Buissonnière</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl pb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`${cat.color} ${cat.border} border-b-8 active:border-b-0 active:translate-y-2 transition-all p-6 md:p-10 rounded-3xl flex flex-col items-center justify-center space-y-4 hover:scale-105 group shadow-xl`}
              >
                <span className="text-6xl md:text-8xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white uppercase">{cat.label}</span>
                  <span className="block text-white/90 text-sm font-semibold mt-1">{cat.desc}</span>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => { resumeAudioIfNeeded(); setShowParentGate(true); }} className="fixed bottom-6 right-6 p-4 bg-white/80 backdrop-blur rounded-full shadow-lg border border-gray-200 hover:bg-gray-100">⚙️</button>
        </div>
      )}

      {view === 'GAME' && renderGame()}
      
      {view === 'SUCCESS' && (
        <div className="h-full flex flex-col items-center justify-center space-y-8 bg-yellow-50">
          <div className="text-9xl animate-bounce">🥳</div>
          <h2 className="text-6xl text-orange-600 font-bold">BRAVO !</h2>
          <Mascot size="lg" expression="happy" />
        </div>
      )}

      {showParentGate && (
        <ParentalGate 
          onSuccess={() => { setShowParentGate(false); setView('PARENT'); }}
          onCancel={() => setShowParentGate(false)}
        />
      )}
    </main>
  );
};

export default App;
