import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store'
import './CarouselItm.css'
const CarouselItm = ({ image, mainheading, subheading, description }) => {
  const snap = useSnapshot(state);
  return (
    <div className="container mt-3 ">
      <div className="row ">
        <div className='add-container-borders' style={{ backgroundColor: snap.themeColor }} >

          <h1 className='text-center text-light mt-3'>{mainheading}</h1>
          <h4 className='text-center text-light'>{subheading}</h4>
          <div className='d-flex justify-content-center '>
            <img height="300px"className='add-border' width="450px" src={`src/assets/${image}`}></img>
            <div style={{ position: 'absolute', top: '60%', right: '30%', color: snap.themeColor }} className='desc-container d-flex align-items-center justify-content-center'>
              {description}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CarouselItm