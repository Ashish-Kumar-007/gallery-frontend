import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import axios from "axios";
import ImageDetailsPage from "./ImageDetailsPage";
import Image from "next/image";
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiChat3Line,
  RiDownload2Fill,
  RiShareCircleLine,
} from "react-icons/ri";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(20); // Replace "20" with the actual likes count for the selected image

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

  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "name";
    link.click();
  };

  useEffect(() => {
    getImages();
    console.log(selectedImage);
  }, []);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
      {images.map((image) => (
        <div key={image._id} className="relative">
          <ImageCard
            image={image}
            button={
              <button
                onClick={() => handleOpenModal(image)}
                className="absolute bottom-2 right-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                View
              </button>
            }
          />
        </div>
      ))}

      {/* Modal */}
      {isOpen && selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-md">
          {/* Overlay */}
          {/* <button
            onClick={handleCloseModal}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-10"
          ></button> */}

          {/* Modal Content */}
          <div className="bg-white p-4 rounded-md shadow-md">
            {/* <ImageDetailsPage image={selectedImage} /> */}
            <Image
              src={selectedImage.image_url}
              alt={selectedImage.caption}
              height={60} /* Adjust the height here */
              width={800} /* Adjust the width here */
              className="object-contain rounded-md w-full h-60" /* Added object-contain class to keep image aspect ratio */
            />

            {/* Comment input field */}
            <input
              type="text"
              placeholder="Leave a comment..."
              className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />

            {/* Likes count with like icons */}
            <div className="flex items-center mt-2">
              {liked ? (
                <RiThumbUpFill
                  className="text-blue-500 mr-1 cursor-pointer"
                  onClick={() => setLiked(false)}
                />
              ) : (
                <RiThumbUpLine
                  className="text-gray-500 mr-1 cursor-pointer"
                  onClick={() => setLiked(true)}
                />
              )}
              <span className="text-gray-600">{likesCount} Likes</span>
              <RiChat3Line className="text-gray-500 ml-2 cursor-pointer" />

              <RiDownload2Fill
                className="text-gray-500 ml-2 cursor-pointer"
                onClick={(e) => downloadImage(selectedImage.image_url)}
              />
              <RiShareCircleLine className="text-gray-500 ml-2 cursor-pointer" values="share"/>
            </div>

            {/* Close button inside the modal content */}
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
