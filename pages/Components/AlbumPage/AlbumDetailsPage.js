import React, { useEffect, useState } from "react";
import ImageCard from "../GalleryPage/ImageCard";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AlbumDetailsPage = ({ isOpen, album, onCloseModal, images }) => {
  console.log(images);
  // const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);


  const getImages = async () => {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/albums/${album._id}`);
      setLoading(true)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/albums/${album._id}`
      );
      const data = response.data;
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  if(loading){
    return <BeatLoader />
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-lg ${
        isOpen ? "" : "hidden"
      }`}
    >
      {/* Modal Content */}
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col lg:w-[1000px] w-80 ">
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
          {loading ? <BeatLoader size={30}/> : null}
          <div className="grid lg:grid-cols-3 grid-col-1 gap-4">
            {images.map((image) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsPage;
