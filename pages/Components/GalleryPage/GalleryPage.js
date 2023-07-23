import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import axios from "axios";
import { TbHandClick } from "react-icons/tb";
import ImageModal from "./ImageModal";
import { RiFilter2Fill } from "react-icons/ri";
import HomeButton from "../HomeButton";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    console.log(image._id);
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
      console.log(response.data);
      const data = response.data;
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getImages();
    console.log(selectedImage);
  }, []);

  return (
    <div className="h-screen p-5">
      {/* Gallery Heading */}
      <h1 className="text-4xl font-bold mb-4 bg-slate-200 p-2 shadow-lg rounded-md">Gallery</h1>
<HomeButton />
      {/* Filter Icon */}
      <div className="flex justify-end">
        <button className="flex text-amber-500 bg-slate-400 hover:bg-slate-600 font-semibold p-2 rounded-md">
          Filter
          <RiFilter2Fill size={25} /> 
        </button>
      </div>

      {/* Image Grid */}
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

      {/* Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={isOpen}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default GalleryPage;
