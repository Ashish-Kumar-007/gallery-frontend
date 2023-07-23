import React, { useState } from 'react';
import ImageCard from './GalleryPage/ImageCard';

const FilterPage = ({ allImages }) => {
  const [filteredImages, setFilteredImages] = useState(allImages);

  const handleFilter = () => {
    // Handle the image filtering logic here (e.g., by date, tags, etc.)
    // Update the "filteredImages" state with the filtered images
  };

  return (
    <div>
      <h2>Filter Images</h2>
      {/* Include filter options and a "Filter" button */}
      <button type="button" onClick={handleFilter}>
        Filter
      </button>
      <div className="grid grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
