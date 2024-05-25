import React from 'react'
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel'
import ThreeDView from '../../components/ThreeDView/ThreeDView'
import AugmentedView from '../../components/AugmentedView/AugmentedView'
const Detail = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div>
            <ImageCarousel></ImageCarousel>
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <AugmentedView></AugmentedView>
        </div>
        <div className="col-12 mb-3">




        </div>
      </div>
    </div>

  )
}

export default Detail