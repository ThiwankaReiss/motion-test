import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUploader = ({ setImage }) => {
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const uploadImage = (e) => {
   
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);



    axios.post('http://localhost:8080/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        setImage(response.data);

      })
      .catch(function (error) {
      
      });



    // setShowImage(true);



  };



  return (


    <>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={uploadImage}
      />

      <button className='btn btn-light'   onClick={handleButtonClick} ><i class="bi bi-plus-circle"></i></button>
    </>
  );
};

export default ImageUploader;
