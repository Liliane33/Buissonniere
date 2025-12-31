
import React from 'react';

interface MascotProps {
  expression?: 'happy' | 'thinking' | 'talking';
  size?: 'sm' | 'md' | 'lg';
}

const Mascot: React.FC<MascotProps> = ({ expression = 'happy', size = 'md' }) => {
  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  return (
    <div className={`${sizes[size]} relative flex items-center justify-center`}>
      {/* Animated Fox Mascot Body */}
      <div className="w-full h-full bg-orange-500 rounded-full relative overflow-hidden shadow-lg border-4 border-orange-600">
        {/* Ears */}
        <div className="absolute top-0 left-4 w-12 h-12 bg-orange-600 rotate-45 -translate-y-6"></div>
        <div className="absolute top-0 right-4 w-12 h-12 bg-orange-600 -rotate-45 -translate-y-6"></div>
        
        {/* Face */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-white rounded-t-full"></div>
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 flex gap-8 z-10">
          <div className="w-4 h-4 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-800 rounded-full animate-pulse"></div>
        </div>
        
        {/* Mouth/Nose */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-6 h-4 bg-pink-300 rounded-full"></div>
        {expression === 'talking' && (
           <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-8 h-4 border-b-4 border-gray-800 rounded-full"></div>
        )}
      </div>
      
      {/* Speech Bubble Tail (Optional) */}
      {expression === 'talking' && (
        <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-md border-2 border-orange-200 text-sm font-bold text-gray-700 max-w-[150px]">
           Écoute bien !
        </div>
      )}
    </div>
  );
};

export default Mascot;
