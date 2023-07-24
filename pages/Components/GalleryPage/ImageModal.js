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
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import AddToAlbumModal from "../AlbumPage/AddToAlbumModal";

const ImageModal = ({ imageId, image, isOpen, onCloseModal }) => {
  const [liked, setLiked] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const addLike = async () => {
    try {
      setLiked(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}/add-like`
      );
      console.log(response.data);
      toast.success("liked success!");
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

  const handlePostComment = async () => {
    try {
      setLoading(true);
      if (!newComment) {
        toast.error("Please enter a comment first!");
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}/add-comment`,
        { comment: newComment }
      );
      setNewComment("");
      console.log(response);
      toast.success("comment success!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle opening the "Add to album" modal
  const handleOpenAddToAlbumModal = () => {
    setIsOpenModal(true);
  };

  // Function to close the "Add to album" modal
  const handleCloseAddToAlbumModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      {isOpen && image && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-md">
          {/* Modal Content */}
          <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
            {/* Close button inside the modal content */}
            <button
              onClick={() => {
                onCloseModal();
                setLiked(false);
              }}
              className="text-amber-500 rounded-md hover:text-amber-600 flex justify-end"
            >
              <RiCloseFill size={25} />
            </button>
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="md:w-2/3 p-4">
                <Image
                  src={image.image_url}
                  alt={image.filename}
                  height={400}
                  width={400}
                  className="object-cover rounded-md w-full h-full"
                />
                {/* Likes count with like icons */}
                <div className="flex items-center mt-1">
                  {liked ? (
                    <RiThumbUpFill
                      size={20}
                      className="text-blue-500 mr-1 cursor-pointer"
                      onClick={() => {
                        // setLiked(false);
                      }}
                    />
                  ) : (
                    <RiThumbUpLine
                      size={20}
                      className="text-gray-500 mr-1 cursor-pointer"
                      onClick={() => addLike()}
                    />
                  )}
                  <span className="text-gray-600">{image?.likes_count}</span>

                  <RiDownload2Fill
                    size={20}
                    className="text-gray-500 ml-2 cursor-pointer"
                    onClick={(e) => downloadImage(image.image_url)}
                  />
                  <RiShareCircleLine
                    size={20}
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
                  {image.comments.map((comment) => (
                    <div key={comment.id} className="mb-2 flex items-center">
                      <RiUserSmileLine size={20} />
                      <p className="text-gray-600 px-2">{comment.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Comment input field */}
                <input
                  type="text"
                  placeholder="Leave a comment..."
                  className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={(e) =>
                    handlePostComment()
                  } /* Add the click handler to post comments */
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <BeatLoader color="#ffff" size={10} />
                  ) : (
                    "Post comment"
                  )}
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                  onClick={handleOpenAddToAlbumModal}
                >
                  Add to album
                </button>
                {/* Modal for Adding to Album */}
                {isOpenModal && imageId && (
                  <AddToAlbumModal
                    imageId={imageId}
                    isOpen={isOpenModal}
                    onCloseModal={handleCloseAddToAlbumModal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
