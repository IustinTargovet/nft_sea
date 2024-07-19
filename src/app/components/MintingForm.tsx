"use client";
import React, { useState } from 'react';

const MintingForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white bg-opacity-10 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl text-white font-semibold mb-4">Mint New NFT</h2>
      <p className="text-gray-300 mb-8 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem tortor quis amet scelerisque vivamus egestas.
      </p>
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center bg-gray-800 bg-opacity-70 border-2 border-dashed border-gray-500 rounded-lg p-6 mb-6">
          <input type="file" onChange={handleImageChange} className="hidden" id="upload-image" />
          <label htmlFor="upload-image" className="cursor-pointer">
            <span className="text-gray-400">📤 Upload Image</span>
            <span className="text-gray-500 mt-2 block">format supported</span>
            {image && <span className="text-white mt-2">{image.name}</span>}
          </label>
        </div>
        <input
          type="text"
          placeholder="NFT Title"
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg focus:outline-none"
        />
        <textarea
          placeholder="Description"
          className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none h-32"
        />
      </div>
      <div className="flex space-x-4 mt-6">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg">
          Mint without listing
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg">
          Mint and list immediately
        </button>
      </div>
    </div>
  );
};

export default MintingForm;
