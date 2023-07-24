import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import AlbumListModal from "./AlbumListModal";
import { toast } from "react-hot-toast";

const AddToAlbumModal = ({ imageId, isOpen, onCloseModal }) => {
  const [albums, setAlbums] = useState([]);

  const addImageToAlbum = async (album) => {
    try {
      const albumTitle = album.title;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${album._id}/image-id`,
        { imageId, albumTitle }
      );
      console.log(response.data);
      const data = response.data;
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error?.response?.data?.message
      // console.error("Error:", error);
      toast.error(errorMessage);
    }
  };

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
  console.log(imageId);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-lg ${
        isOpen ? "" : "hidden"
      }`}
    >
      {/* Modal Content */}
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col lg:w-[600px] w-80 ">
        {/* Close button inside the modal content */}
        <button
          onClick={onCloseModal}
          className="text-amber-500 rounded-md hover:text-amber-600 flex justify-end"
        >
          <RxCross1 size={20} />
        </button>
        {/* Album Title Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 mt-5">
          {albums.map((album) => (
            <AlbumListModal
              key={album._id}
              album={album}
              imageId={imageId}
              button={
                <button
                  className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-40"
                  onClick={(e) => addImageToAlbum(album)}
                >
                  Click to add
                </button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddToAlbumModal;
