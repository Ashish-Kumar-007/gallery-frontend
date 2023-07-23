import React from 'react';

const AlbumCard = ({ album }) => {
  const { title, coverImageUrl, imageCount } = album;

  return (
    <div className="border p-4">
      {/* Display the album cover image */}
      <img src={coverImageUrl} alt={title} />
      <h3>{title}</h3>
      <p>Number of Images: {imageCount}</p>
    </div>
  );
};

export default AlbumCard;
