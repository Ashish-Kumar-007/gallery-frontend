import React, { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import axios from "axios";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const getAlbums = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/albums`
      );
      console.log(response.data);
      const data = response.data;
      setAlbums(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  useEffect(() => {
    getAlbums();
  }, []);
  return (
    <div className="m-5">
  <h2 className="text-3xl font-bold mb-4">Albums</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {albums.map((album) => (
      <AlbumCard key={album._id} album={album} />
    ))}
  </div>
</div>

  );
};

export default AlbumsPage;
