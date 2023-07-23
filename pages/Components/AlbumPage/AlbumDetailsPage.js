import React from 'react';
import ImageCard from '../GalleryPage/ImageCard';

const AlbumDetailsPage = ({ album }) => {
  const { title, description, images } = album;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetailsPage;
