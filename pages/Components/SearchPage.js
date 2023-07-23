import React, { useState } from 'react';
import ImageCard from './GalleryPage/ImageCard';

const SearchPage = ({ allImages }) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Handle the image search logic here (e.g., filter images by keyword)
    // Update the "searchResults" state with the filtered images
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Images</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {searchResults.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
