import React, { useState } from 'react';
import ImageCard from './GalleryPage/ImageCard';
import HomeButton from './HomeButton';

const SearchPage = ({ allImages }) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Handle the image search logic here (e.g., filter images by keyword)
    // Update the "searchResults" state with the filtered images
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-6 bg-slate-200 p-3 rounded-md shadow-md">Search Images</h2>
      <div className='mb-4'>
        <HomeButton />
      </div>
      
      <div className="flex items-center mb-8">
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {searchResults.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
