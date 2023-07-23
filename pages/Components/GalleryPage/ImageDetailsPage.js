import React from "react";
import {
  AiFillHeart,
  AiFillComment,
  AiOutlineDownload,
  AiOutlineShareAlt,
} from "react-icons/ai";
import ImageCard from "./ImageCard";
import Image from "next/image";

const ImageDetailsPage = ({ image }) => {
  // const { caption, createdAt, image_url, path } = image;
  console.log(image);

  return (
    <div>
      <Image
        src={
          "http://res.cloudinary.com/de8umoujt/image/upload/v1690091420/vjebywascg0xyh8g2fpg.jpg"
        }
        alt={"caption"}
        height={100}
        width={1000}
      />
      <h2>{"caption"}</h2>
      <p>Date: {"createdAt"}</p>
      {/* <p>Description: {description}</p> */}
      <div>
        <AiFillHeart /> {"likes"}
        <AiFillComment /> {"comments"}
        <AiOutlineDownload /> Download
        <AiOutlineShareAlt /> Share
      </div>
      {/* <p>Tags: {tags.join(', ')}</p> */}
    </div>
  );
};

export default ImageDetailsPage;
