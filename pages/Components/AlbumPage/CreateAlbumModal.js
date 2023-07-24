import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const CreateAlbumModal = ({ isOpen, onCloseModal, onCreateAlbum }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCreateAlbum = async () => {
    try {
      console.log(
        { title, description },
        `${process.env.NEXT_PUBLIC_API_URL}/create-album`
      );
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", file);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-album`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Reset the input fields
      setTitle("");
      setDescription("");
      onCloseModal();
    } catch (error) {
      console.error("error message", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-blur-lg ${
        isOpen ? "" : "hidden"
      }`}
    >
      {/* Modal Content */}
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
        {/* Close button inside the modal content */}
        <button
          onClick={onCloseModal}
          className="text-amber-500 rounded-md hover:text-amber-600 flex justify-end"
        >
          <RxCross1 size={20} />
        </button>
        {/* Album Title Input */}
        <input
          type="text"
          placeholder="Album Title"
          value={title}
          onChange={handleTitleChange}
          className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        {/* Album Description Input */}
        <textarea
          rows="4"
          placeholder="Album Description"
          value={description}
          onChange={handleDescriptionChange}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none"
        />
        {/* Create Album Button */}
        <button
          onClick={handleCreateAlbum}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
        >
          Create Album
        </button>
      </div>
    </div>
  );
};

export default CreateAlbumModal;
