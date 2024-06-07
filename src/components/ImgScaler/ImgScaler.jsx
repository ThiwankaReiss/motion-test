import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImgScaler.css'
const ImgScaler = ({ Image, setterFunction, showImage }) => {

    const [fetchedImage, setFetchedImage] = useState(null);

    const getValue = (event) => {
        const value = event.target.value;
        const newGeos = [...setterFunction.array];
        newGeos[setterFunction.edit] = {
          ...newGeos[setterFunction.edit],
          repeate: value
        };
        setterFunction.func(newGeos);
      };
    useEffect(()=>{
        const fetchImage = async () => {
            if(Image!=null){
                try {
                    const response = await axios.get(`http://localhost:8080/images/${Image}`, {
                      responseType: 'blob',
                    });
                    const url = URL.createObjectURL(response.data);
                    setFetchedImage(url);
                  } catch (error) {
                    console.error('Error fetching image:', error);
                  }  
            }
            
          };
          fetchImage();
      },[Image]);
   
    return (
        <div className='card m-1'>
            {
                Image && (
                    <>
                        <div className='w-100 d-flex justify-content-center text-secondary mt-2 mb-2'>Current Image</div>
                        <div className='w-100 d-flex justify-content-center mb-3'>
                            {
                                showImage && showImage == true && (
                                    <img className='image-styles bg-black' src={fetchedImage} alt="decal"></img>
                                )
                            }
                            {
                                showImage && showImage == false && (
                                    <div class="spinner-grow" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                )
                            }

                        </div>
                        <form>
                            <label htmlFor="customRange1" className="form-label"></label>
                            <input type="range" className="form-range" onChange={getValue} id="customRange1" />
                        </form>
                    </>
                )
            }
        </div>
    );
}

export default ImgScaler;
