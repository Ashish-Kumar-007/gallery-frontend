import React, { useState } from 'react';

const CreateAlbumPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateAlbum = () => {
    // Handle the album creation logic here (e.g., using an API)
    // After successful creation, redirect users to the Albums Page
  };

  return (
    <div>
      <h2>Create Album</h2>
      <form>
        <input
          type="text"
          placeholder="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Album Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="button" onClick={handleCreateAlbum}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAlbumPage;
