import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Image Gallery App</h1>
      <p className="text-lg mb-8">A brief introduction to the app...</p>
      <nav className="flex space-x-4">
        <Link href="./gallery">
          <button className="text-lg font-semibold hover:underline">Gallery</button>
        </Link>
        <Link href="/album">
          <button className="text-lg font-semibold hover:underline">Albums</button>
        </Link>
        <Link href="./upload">
          <button className="text-lg font-semibold hover:underline">Upload</button>
        </Link>
        <Link href="/search">
          <button className="text-lg font-semibold hover:underline">Search</button>
        </Link>
      </nav>
    </div>
  );
};

export default LandingPage;
