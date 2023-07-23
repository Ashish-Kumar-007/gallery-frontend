import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to the Image Gallery App
      </h1>
      <p className="text-lg mb-8 text-center">
        The Image Gallery App is a user-friendly platform to view, organize, and
        share your favorite images effortlessly. Enjoy a seamless visual
        experience!
      </p>
      <nav className="flex flex-col space-y-4 items-center sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link href="/gallery">
          <button className="text-lg font-semibold hover:text-gray-200 px-4 py-2 rounded-md">
            Gallery
          </button>
        </Link>
        <Link href="/album">
          <button className="text-lg font-semibold hover:text-gray-200 px-4 py-2 rounded-md">
            Albums
          </button>
        </Link>
        <Link href="/upload">
          <button className="text-lg font-semibold hover:text-gray-200 px-4 py-2 rounded-md">
            Upload
          </button>
        </Link>
        <Link href="/search">
          <button className="text-lg font-semibold hover:text-gray-200 px-4 py-2 rounded-md">
            Search
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default LandingPage;
