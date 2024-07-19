"use client";

import React from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-5xl flex justify-between items-center p-6">
      <h1 className="text-white text-3xl font-bold">NFT SEA</h1>
      <div className="flex space-x-4 items-center">
        <Link href="#" className="text-white hover:underline">
          Explore Marketplace
        </Link>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
