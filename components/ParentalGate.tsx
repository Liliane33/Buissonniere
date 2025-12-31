
import React, { useState } from 'react';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const [num1] = useState(Math.floor(Math.random() * 5) + 1);
  const [num2] = useState(Math.floor(Math.random() * 5) + 1);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (parseInt(input) === num1 + num2) {
      onSuccess();
    } else {
      setInput('');
      alert("Oups ! Essaie encore.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Espace Parents</h2>
        <p className="mb-6 text-gray-600">Calcule pour entrer :</p>
        <div className="text-4xl font-bold mb-6 text-orange-500">
          {num1} + {num2} = ?
        </div>
        
        <input 
          type="number" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full text-center text-3xl p-4 border-2 border-gray-200 rounded-2xl mb-6 focus:border-orange-500 focus:outline-none"
          autoFocus
        />

        <div className="flex gap-4">
          <button 
            onClick={onCancel}
            className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button 
            onClick={handleSubmit}
            className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentalGate;
