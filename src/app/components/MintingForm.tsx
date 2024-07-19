"use client";

import React, { useState } from 'react';
import { pinFileToIPFS, pinJSONToIPFS } from '../../pinata';
import Confirmation from './Confirmation';
import { useWriteContract } from 'wagmi';
import { abi } from '@/abi';

const MintingForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [imageHash, setImageHash] = useState<string | null>(null);
  const [metadataURI, setMetadataURI] = useState<string | null>(null);

  const {  writeContract } = useWriteContract();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleMint = async () => {
    if (!image || !title || !description) return;
    setMinting(true);
    setError(null);

    try {
      // Upload image to IPFS
      const imageResult = await pinFileToIPFS(image);
      const imageHash = imageResult.IpfsHash;
      setImageHash(imageHash);

      // Create metadata JSON object
      const metadata = {
        description,
        external_url: '', // Set this to your project's external URL if needed
        image: `https://ipfs.io/ipfs/${imageHash}`,
        name: title,
      };

      // Upload metadata to IPFS
      const metadataResult = await pinJSONToIPFS(metadata);
      const metadataURI = metadataResult.IpfsHash;
      setMetadataURI(metadataURI);

      // Generate a token ID (you can use a timestamp, a counter, or any other unique method)
      const newTokenId = Math.floor(Date.now() / 1000);

      // Mint the NFT
      const addressEnv = process.env.NEXT_PUBLIC_NFT_ADDRESS || '';
      const address: `0x${string}` = addressEnv.startsWith('0x') ? addressEnv as `0x${string}` : '0x' as `0x${string}`;

      const tx = await writeContract({
        address,
        abi,
        functionName: 'mint',
        args: [newTokenId, metadataURI],
      });

      console.log(`Transaction Hash: ${tx}`);
      setSuccess(true);
    } catch (error) {
      console.error('Error during minting:', error);
      setError('Minting failed. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  const handleContinue = () => {
    setImage(null);
    setTitle('');
    setDescription('');
    setError(null);
    setSuccess(false);
    setImageHash(null);
    setMetadataURI(null);
  };

  const isFormIncomplete = !image || !title || !description;

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
          className={`px-6 py-3 font-semibold rounded-lg ${isFormIncomplete || minting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'}`}
          disabled={isFormIncomplete || minting}
        >
          {minting ? 'Minting...' : 'Mint'}
        </button>
      </div>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && imageHash && metadataURI && (
        <Confirmation
          title={title}
          description={description}
          imageUrl={`https://ipfs.io/ipfs/${imageHash}`}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default MintingForm;
