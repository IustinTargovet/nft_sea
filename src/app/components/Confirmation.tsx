"use client";

import React from 'react';

interface ConfirmationProps {
  title: string;
  description: string;
  imageUrl: string;
  onContinue: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ title, description, imageUrl, onContinue }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md text-center text-white">
        <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        <button
          onClick={onContinue}
          className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
