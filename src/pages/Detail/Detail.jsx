import React, { useState } from 'react'
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel'
import AugmentedView from '../../components/AugmentedView/AugmentedView'
import state from '../../store'
import { useSnapshot } from 'valtio'
import Sorter from '../../components/Sorters/Sorter'
import './Detail.css'
const Detail = () => {
  const snap = useSnapshot(state);
  const [augmented, setAugmented] = useState(null);

  const handleModeChange = (e) => {
    setAugmented(e.target.checked)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mt-4">
          <p style={{color:snap.themeColor}}>
            Name :&nbsp;{state.geometry.name} &nbsp;&nbsp;&nbsp;
             Price :&nbsp;Rs.{state.geometry.price}/=
          </p>
        </div>
        <div className="col-lg-4 d-flex justify-content-end mt-3">
          <p className='m-2'>3D </p>
          <div class="toggle-border m-2">
            <input id="one" type="checkbox" onChange={handleModeChange} />
            <label for="one">
              <div class="handle"></div>
            </label>
          </div>
          <p className='m-2'> AR</p>
        </div>
        <div className="col-lg-6 mb-3">
        
          <ImageCarousel imagesArray={snap.geometry.images}></ImageCarousel>
          
        </div>
        <div className="col-lg-6 mb-3 mt-2">
          {augmented && (<AugmentedView  ></AugmentedView>) ||
            (<Sorter geos={snap.geometry.materials} model={snap.geometry.type}></Sorter>)
          }
        </div>
      </div>
    </div>

  )
}

export default Detail