import React, { useEffect, useState } from "react";
import ImageCard from "../GalleryPage/ImageCard";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AlbumDetailsPage = ({ isOpen, album, onCloseModal, images }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-lg ${
        isOpen ? "" : "hidden"
      }`}
    >
      {/* Modal Content */}
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col w-full max-w-screen-sm">
        {/* Close button inside the modal content */}
        <button
          onClick={onCloseModal}
          className="text-amber-500 rounded-md hover:text-amber-600 flex justify-end"
        >
          <RxCross1 size={20} />
        </button>
        <div>
          {/* <h2>{album.title}</h2>
          <p>{description}</p> */}
          {/* {loading ? <BeatLoader size={30} /> : null} */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images?.map((image) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsPage;
