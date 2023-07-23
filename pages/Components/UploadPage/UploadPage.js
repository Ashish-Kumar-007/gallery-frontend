import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import HomeButton from "../HomeButton";
// import fs from "fs";

const UploadPage = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", file);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload`,
          formData
        );
        console.log(response.data);
      } else {
        console.log("No file selected.");
      }
      router.push("/");
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error gracefully (e.g., show an error message to the user)
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
      >
        Upload
      </button>
    </form>
  </div>
</div>

  );
};

export default UploadPage;

// export async function getStaticProps({ params }) {
//   try {
//     console.log(params);
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`);

//     // Assuming the API returns data as response.data, you can access it here
//     const posts = response.data;

//     return { props: { posts } };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return { props: { posts: [] } }; // Return an empty array or handle the error as needed
//   }
// }
