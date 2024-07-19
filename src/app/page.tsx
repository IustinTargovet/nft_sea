"use client";

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MintingForm from './components/MintingForm';
import { Profile } from './components/Profile';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-purple-900 via-black to-black">
      <Header />
      <Profile />
      <MintingForm />
      <Footer />
    </main>
  );
}
