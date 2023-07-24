import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import HomeButton from "../HomeButton";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const UploadPage = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", file);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload`,
          formData
        );
        console.log(response);
        toast.success(response.data.message, {
          duration: 3000,
        })
        if(response.status == 200){
          router.push("/");
        }
    } catch (error) {
      const errorMessage = error.response?.data?.message
      console.error("Error uploading file:", error.response.data.message);
      toast.error(errorMessage, {
        duration: 3000,
      })
      // Handle error gracefully (e.g., show an error message to the user)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <HomeButton />
        <h2 className="text-4xl font-bold mb-4 text-center">Upload Image</h2>
        <form>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500"
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100"
              placeholder="Upload image"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500"
              type="text"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={(e) => handleUpload(e)}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            >
              {loading ? (
                <BeatLoader color="#ffff" size={10} />
              ) : (
                "Post comment"
              )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;