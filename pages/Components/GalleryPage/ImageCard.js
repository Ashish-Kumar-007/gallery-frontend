import Image from "next/image";
import React, { useState } from "react";

const ImageCard = ({ image, button }) => {
  const { filename, createdAt, image_url, path } = image;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 bg-white">
      <div className="relative">
        <Image
          src={image_url}
          alt={filename}
          layout="responsive"
          width={400}
          height={300}
          className="object-cover w-full h-40 rounded-t-lg"
        />
      </div>
      <div className="">
        {/* <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {filename}
        </h3> */}
        {/* <p className="text-sm text-gray-500 mb-2">Uploaded at: {createdAt}</p> */}
        {button}

        {/* Additional content can be added here */}
        {/* <div className="flex items-center">
          <span className="text-gray-600 mr-2">{"20"} Likes</span>
          <span className="text-gray-600">{"10"} Comments</span>
        </div> */}
      </div>
    </div>
  );
};

export default ImageCard;
