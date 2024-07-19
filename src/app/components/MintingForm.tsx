"use client";

import React, { useState } from 'react';
import { pinFileToIPFS, pinJSONToIPFS } from '../../pinata';

const MintingForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [metadataURI, setMetadataURI] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      await uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const result = await pinFileToIPFS(file);
      setIpfsHash(result.IpfsHash);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleMint = async () => {
    if (!ipfsHash || !title || !description) return;

    const metadata = {
      description,
      external_url: '', // You can set this to your project's external URL if needed
      image: `https://ipfs.io/ipfs/${ipfsHash}`,
      name: title,
    };

    try {
      const result = await pinJSONToIPFS(metadata);
      setMetadataURI(result.IpfsHash);
      // Proceed with calling the mint function on the contract here
    } catch (error) {
      console.error('Error uploading metadata:', error);
    }
  };

  const isFormIncomplete = !ipfsHash || !title || !description;

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
            {uploading && <span className="text-white mt-2">Uploading...</span>}
            {ipfsHash && (
              <div className="mt-4 text-white">
                Image uploaded to IPFS: <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">{ipfsHash}</a>
              </div>
            )}
          </label>
        </div>
      </div>
      <input
        type="text"
        placeholder="NFT Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg focus:outline-none"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none h-32"
      />
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleMint}
          className={`px-6 py-3 font-semibold rounded-lg ${isFormIncomplete ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'}`}
          disabled={isFormIncomplete}
        >
          Mint without listing
        </button>
        <button
          onClick={handleMint}
          className={`px-6 py-3 font-semibold rounded-lg ${isFormIncomplete ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'}`}
          disabled={isFormIncomplete}
        >
          Mint and list immediately
        </button>
      </div>
      {metadataURI && (
        <div className="mt-4 text-white">
          Metadata uploaded to IPFS: <a href={`https://ipfs.io/ipfs/${metadataURI}`} target="_blank" rel="noopener noreferrer">{metadataURI}</a>
        </div>
      )}
    </div>
  );
};

export default MintingForm;
