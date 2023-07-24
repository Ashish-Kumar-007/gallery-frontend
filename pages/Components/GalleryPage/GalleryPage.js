import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { RiFilter2Fill, RiUpload2Fill } from "react-icons/ri";
import { TbHandClick } from "react-icons/tb";

import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";
import HomeButton from "../HomeButton";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageId, setImageId] = useState(null);
  const router = useRouter();

  const handleOpenModal = async (image) => {
    const data = await getImageDetails(image);
    setSelectedImage(data);
    setImageId(image._id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  const getImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/get-images`
      );
      const data = response.data;
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const getImageDetails = async (image) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/images/${image._id}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="h-screen p-5">
      <h1 className="text-4xl font-bold mb-4 bg-slate-200 p-2 shadow-lg rounded-md">
        Gallery
      </h1>
      <HomeButton />

      <div className="flex justify-end">
        <button className="flex text-gray-900 bg-slate-300 mx-2 hover:bg-slate-400 font-semibold p-2 rounded-md">
          Filter
          <RiFilter2Fill size={25} />
        </button>
        <button
          className="flex text-gray-900 bg-slate-300 hover:bg-slate-400 font-semibold p-2 rounded-md"
          onClick={(e) => {
            router.push("/upload");
          }}
        >
          Upload Image
          <RiUpload2Fill size={25} />
        </button>
      </div>

      <ImageGrid images={images} handleOpenModal={handleOpenModal} />

      <ImageModal
        imageId={imageId}
        image={selectedImage}
        isOpen={isOpen}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

// A separate component for the Image Grid
const ImageGrid = ({ images, handleOpenModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
      {images.map((image) => (
        <div key={image._id} className="relative">
          <ImageCard
            image={image}
            button={
              <button
                onClick={() => handleOpenModal(image)}
                className="absolute bottom-2 right-2 px-2 py-1 text-amber-400 rounded-md hover:text-amber-600"
              >
                <TbHandClick size={25} />
              </button>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryPage;
