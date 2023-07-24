import Image from "next/image";
import React, { useState } from "react";

const ImageCard = ({ image, button }) => {
  // const { filename, createdAt, image_url, caption } = image;
  // console.log(image);
  return (
    <div className="border rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 bg-white">
      <div className="relative">
        <Image
          src={image.image_url}
          alt={image.caption}
          layout="responsive"
          width={400}
          height={300}
          className="object-cover w-full h-40 rounded-t-lg"
        />{button}
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800 mx-2 mb-2 truncate">
          {image.caption}
        </h3>
        <p className="text-sm text-gray-500 font-semibold mb-2 mx-2">Uploaded at: {image.createdAt}</p>
      </div>
    </div>
  );
};

export default ImageCard;
