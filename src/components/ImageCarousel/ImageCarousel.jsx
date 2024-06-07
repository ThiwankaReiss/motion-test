import React, { useEffect, useState } from 'react'
import './ImageCarousel.css'
import { useSnapshot } from 'valtio'
import state from '../../store'
import axios from 'axios'
const ImageCarousel = ({ imagesArray,getImgActive }) => {
    const [activeImg, setActiveImage] = useState(0);
    const snap = useSnapshot(state);
    const [imgArray, setImgArray] = useState([]);

    const getActiveImg=(index)=>{
        setActiveImage(index)
        if(getImgActive!=null){
            getImgActive(index)
        }
  
    }
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const responses = await Promise.allSettled(
                    imagesArray.map(img => axios.get(`http://localhost:8080/images/${img}`, {
                        responseType: 'blob',
                    }))
                );

                const urls = responses.map((result, index) => {
                    if (result.status === 'fulfilled') {
                        return {
                            image: URL.createObjectURL(result.value.data),

                        };
                    } else {
                        console.error(`Error fetching image for ${geos[index].name}:`, result.reason);
                        return {
                            image: 'src/assets/noImage.png',

                        };
                    }
                });

                setImgArray(urls);
            } catch (error) {
                console.error('Error in fetching images:', error);
            }
        };

        fetchImages();
    }, [imagesArray]);
    
    return (
        <div className="container card mt-3" style={{ backgroundColor: snap.themeColor }}>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-11 mt-3 mb-3  card ">

                    <div id="carouselExampleAutoplaying" class="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner add-min-height">
                            {imgArray && imgArray.map((data, index) => (
                                <div className={`carousel-item ${activeImg == index ? 'active' : ''}`}>
                                    <div className='w-100 d-flex align-items-center justify-content-center'>
                                        <img height="300px" className='mt-3 mb-3' width="450px" src={data.image}></img>
                                    </div>

                                </div>
                            ))}


                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-11 mt-3 mb-3 d-flex justify-content-center">
                    {imgArray && imgArray.map((data, index) => (
                        <button onClick={() => {getActiveImg(index)}} className='btn btn-outline-light add-padding'>
                            <img height="40px" width="50px" src={data.image}></img>
                        </button>
                    ))}

                    
                </div>
            </div>
        </div>

    )
}

export default ImageCarousel