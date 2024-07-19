import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-purple-900 via-black to-black">
      <header className="w-full max-w-5xl flex justify-between items-center p-6">
        <h1 className="text-white text-3xl font-bold">NFT SEA</h1>
        <a href="#" className="text-white hover:underline">Explore Marketplace</a>
      </header>

      <div className="flex flex-col items-center bg-white bg-opacity-10 p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl text-white font-semibold mb-4">Mint New NFT</h2>
        <p className="text-gray-300 mb-8 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem tortor quis amet scelerisque vivamus egestas.
        </p>
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center bg-gray-800 bg-opacity-70 border-2 border-dashed border-gray-500 rounded-lg p-6 mb-6">
            <span className="text-gray-400">📤 Upload Image</span>
            <span className="text-gray-500 mt-2">format supported</span>
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

      <footer className="mt-16 text-gray-500">
        NFT Sea 2022 © All right reserved
      </footer>
    </main>
  );
}
