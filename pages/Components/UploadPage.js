import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import fs from "fs";

const UploadPage = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const router = useRouter();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log(reader.result);
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.log("error", error);
        reject(error);
      };
    });
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      // const formData = new FormData();
      // formData.append("caption", "myfile");
      // formData.append("image", file);
      if (file) {
        // convertToBase64(file)
        //   .then(async (base64String) => {
        //     console.log("Base64 data:", base64String);
        //     const response = await axios.post(
        //       `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        //       { caption, base64String }
        //     );
        //     console.log(response.data);
        //   })
        //   .catch((error) => {
        //     console.error("Error converting to Base64:", error);
        //   });
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

      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      //   formData
      // );

      // console.log(response.data);
      router.push("/");
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error gracefully (e.g., show an error message to the user)
    }
  };

  return (
    <div class="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div class="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-slate-100">
        <h2 class="text-2xl font-bold mb-4">Upload Image</h2>
        <form>
          <div class="mb-4">
            <input
              class="w-full px-4 py-2 border rounded-lg focus:outline-none"
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <input
              type="file"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
              placeholder="Upload image"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div class="mb-4">
            <input
              class="w-full px-4 py-2 border rounded-lg focus:outline-none"
              type="text"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={(e) => handleUpload(e)}
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
