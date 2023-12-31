import Image from "next/image";
import React from "react";

const AlbumCard = ({ album, button, imageId }) => {
  // const { title, description, album_image } = album;
  // const date = new Date(album.createdAt);
  // console.log(album?.title, date);

  return (
    <div class="border border-gray-300 rounded p-4 shadow-md">
      <Image src={album?.album_image} alt={album?.title} height={500} width={500} />

      <h3 class="text-xl font-bold mb-2">{album?.title}</h3>
      <p class="text-gray-600 font-semibold">Description: {album?.description}</p>
      <p class="text-gray-600 font-semibold">Created at: {(album?.createdAt)}</p>
      {button}
    </div>
  );
};

export default AlbumCard;
