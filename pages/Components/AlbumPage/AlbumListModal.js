import Image from "next/image";
import React from "react";

const AlbumListModal = ({ album, button, imageId }) => {
  // const { title, description, album_image } = album;

  return (
<div className="flex flex-row border justify-center border-gray-300 rounded p-4 shadow-md items-center">
  <div className="flex flex-col mr-2">
    <Image src={album.album_image} alt={album.title} height={100} width={120} />
    <h3 className="text-xl font-semibold">{title}</h3>
  </div>
  {button}
</div>

  );
};

export default AlbumListModal;
