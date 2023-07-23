import React, { useState } from "react";
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiDownload2Fill,
  RiShareCircleLine,
  RiCloseFill,
  RiUserSmileLine,
} from "react-icons/ri";
import Image from "next/image";

const demoComments = [
  {
    id: 1,
    text: "Beautiful image!",
  },
  {
    id: 2,
    text: "Amazing photography!",
  },
  {
    id: 3,
    text: "I love this picture!",
  },
  {
    id: 4,
    text: "Stunning view!",
  },
  {
    id: 5,
    text: "Great shot!",
  },
];

const ImageModal = ({ image, isOpen, onCloseModal }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0); // Replace "20" with the actual likes count for the selected image
  const [comments, setComments] = useState(demoComments); // You can replace this with your actual comments data

  const addLike = async () => {
    try {
      console.log(selectedImage);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/images/selectedImage._id`
      );
      console.log(response.data);
      const data = response.data;
      setLikesCount(data);
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

  const shareImage = async (imageUrl, caption) => {
    const shareableLink = `${imageUrl}`;
    console.log("Fallback link:", shareableLink);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this image!",
          text: caption,
          url: imageUrl,
        });
        console.log(
          await navigator.share({
            title: "Check out this image!",
            text: caption,
            url: imageUrl,
          })
        );
      } catch (error) {
        console.error("Error sharing the image:", error);
      }
    } else {
      const shareableLink = `${window.location.origin}/image/${imageUrl}`;
      console.log("Fallback link:", shareableLink);
    }
  };

  return (
    <>
      {isOpen && image && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-md">
          {/* Modal Content */}
          <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
            {/* Close button inside the modal content */}
            <button
              onClick={onCloseModal}
              className=" text-amber-500 rounded-md hover:text-amber-600 flex justify-end"
            >
              <RiCloseFill size={25} />
            </button>
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="md:w-2/3 p-4">
                <Image
                  src={image.image_url}
                  alt={"image.filename"}
                  height={60}
                  width={250}
                  className="object-contain rounded-md w-full h-full"
                />
                {/* Likes count with like icons */}
                <div className="flex items-center mt-1">
                  {liked ? (
                    <RiThumbUpFill
                      className="text-blue-500 mr-1 cursor-pointer"
                      onClick={() => {
                        // setLiked(false);
                        addLike();
                      }}
                    />
                  ) : (
                    <RiThumbUpLine
                      className="text-gray-500 mr-1 cursor-pointer"
                      onClick={() => setLiked(true)}
                    />
                  )}
                  <span className="text-gray-600">{likesCount}</span>

                  <RiDownload2Fill
                    className="text-gray-500 ml-2 cursor-pointer"
                    onClick={(e) => downloadImage(image.image_url)}
                  />
                  <RiShareCircleLine
                    className="text-gray-500 ml-2 cursor-pointer"
                    onClick={() => shareImage(image.image_url, image.caption)}
                  />
                </div>
              </div>

              {/* Right side - Comments */}
              <div className="md:w-1/3 p-2">
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                <div className="border-t pt-2">
                  {/* Render comments here */}
                  {/* Example: */}
                  {comments.map((comment) => (
                    <div key={comment.id} className="mb-2 flex items-center">
                      <RiUserSmileLine />
                      <p className="text-gray-600 px-2">{comment.text}</p>
                    </div>
                  ))}
                </div>

                {/* Comment input field */}
                <input
                  type="text"
                  placeholder="Leave a comment..."
                  className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  // value={newComment}
                  // onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  // onClick={
                  //   handlePostComment
                  // } /* Add the click handler to post comments */
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
