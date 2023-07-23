import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumsPage = ({ albums }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {albums.map((album) => (
        <AlbumCard key={album._id} album={album} />
      ))}
    </div>
  );
};

export default AlbumsPage;
