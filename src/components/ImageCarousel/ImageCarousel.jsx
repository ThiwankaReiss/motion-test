import React, { useState } from 'react'
import './ImageCarousel.css'
import { useSnapshot } from 'valtio'
import state from '../../store'
const ImageCarousel = () => {
    const [activeImg, setActiveImage] = useState(1);
    const snap = useSnapshot(state);
    return (
        <div className="container card mt-3" style={{backgroundColor:snap.themeColor,zIndex:999}}>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-11 mt-3 mb-3  card ">

                    <div id="carouselExampleAutoplaying" class="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div className={`carousel-item ${activeImg == 1 ? 'active':''}`}>
                                <div className='w-100 d-flex align-items-center justify-content-center'>
                                    <img height="300px" className='mt-3 mb-3' width="450px" src={`src/assets/loginback.jpg`}></img>
                                </div>

                            </div>
                            <div className={`carousel-item ${activeImg == 2 ? 'active':''}`}>
                                <div className='w-100 d-flex align-items-center justify-content-center'>
                                    <img height="300px" className='mt-3 mb-3' width="450px" src={`src/assets/noticeIcon.png`}></img>
                                </div>
                            </div>
                            <div className={`carousel-item ${activeImg == 3 ? 'active':''}`}>
                                <div className='w-100 d-flex align-items-center justify-content-center'>
                                    <img height="300px" className='mt-3 mb-3' width="450px" src={`src/assets/react.svg`}></img>
                                </div>
                            </div>
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
                <div  className="col-11 mt-3 mb-3 d-flex justify-content-center">
                    
                    <button onClick={()=>setActiveImage(1)} className='btn btn-outline-light add-padding'>
                        <img height="40px"  width="50px" src={`src/assets/loginback.jpg`}></img>
                    </button>
                    <button onClick={()=>setActiveImage(2)} className='btn btn-outline-light add-padding'>
                        <img height="40px"  width="50px" src={`src/assets/noticeIcon.png`}></img>
                    </button>
                    <button onClick={()=>setActiveImage(3)} className='btn btn-outline-light add-padding'>
                        <img height="40px"  width="50px" src={`src/assets/react.svg`}></img>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ImageCarousel