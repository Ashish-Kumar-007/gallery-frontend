import React, { useState, useEffect } from "react";
import CreateAlbumModal from "./CreateAlbumModal";
import HomeButton from "../HomeButton";
import AlbumCard from "./AlbumCard";
import axios from "axios";
import { TiPlus } from "react-icons/ti";
import AlbumDetailsPage from "./AlbumDetailsPage";

const AlbumPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [albumImages, setAlbumImages] = useState([]); // New state to hold images

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleOpenImageModal = (album) => {
    setSelectedAlbum(album);
    setIsOpen(true);

    // Fetch images of the selected album
    fetchAlbumImages(album._id);
  };

  const handleCloseImageModal = () => {
    setIsOpen(false);
  };

  const handleCreateAlbum = (albumData) => {
    // Handle album creation logic here
    console.log("Creating Album:", albumData);
  };

  const fetchAlbumImages = async (albumId) => {
    try {
      console.log(albumId);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/albums/${albumId}`
      );
      const data = response.data;
      setAlbumImages(data);
      console.log(albumImages);
    } catch (error) {
      console.error("Error fetching album images:", error);
    }
  };

  return (
    <div className="m-5">
      <h2 className="text-3xl font-bold mb-4 bg-slate-200 p-3 rounded-md shadow-md">
        Albums
      </h2>
      <HomeButton />
      <button
        onClick={handleOpenModal}
        className=" absolute top-22 right-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold"
      >
        <TiPlus size={20} />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {albums.map((album) => (
          <AlbumCard
            key={album._id}
            album={album}
            button={
              <button
                className=" bottom-2 right-2 px-2 py-1 text-amber-400 rounded-md hover:text-amber-600"
                onClick={() => handleOpenImageModal(album)}
              >
                View Album
              </button>
            }
          />
        ))}
      </div>

      <AlbumDetailsPage
        isOpen={isOpen}
        album={selectedAlbum}
        images={albumImages} // Pass the album images to the modal
        onCloseModal={handleCloseImageModal}
      />

      {/* Render the CreateAlbumModal */}
      <CreateAlbumModal
        isOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        onCreateAlbum={handleCreateAlbum}
      />
    </div>
  );
};

export default AlbumPage;
