import Image from "next/image";
import React from "react";

const AlbumCard = ({ album }) => {
  const { title, description } = album;

  return (
    <div class="border border-gray-300 rounded p-4 shadow-md">
      <Image
        src={
          "http://res.cloudinary.com/de8umoujt/image/upload/v1690091420/vjebywascg0xyh8g2fpg.jpg"
        }
        alt={"title"}
        height={500}
        width={500}
      />

      <h3 class="text-xl font-bold mb-2">{title}</h3>
      <p class="text-gray-600">Description: {description}</p>
      <p class="text-gray-600">Number of Images: {10}</p>
    </div>
  );
};

export default AlbumCard;
