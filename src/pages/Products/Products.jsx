import React, { useEffect, useState } from 'react'
import CarouselItm from '../../components/CarouselItm/CarouselItm'
import { useSnapshot } from 'valtio'
import state from '../../store'
import Aos from 'aos'
import CanvasModel from '../../canvas/CanvasModel'
import Sorter from '../../components/Sorters/Sorter'
import './Products.css'
import { useNavigate } from 'react-router-dom'
import WoodenChair from '../../components/ThreeDModels/WoodenChair'
import axios from 'axios'
import SideBill from '../../components/SideBill/SideBill'
const Products = () => {
  const [geometries, setGeometries] = useState([
    {
        "id": 1,
        "price": 800.0,
        "name": "Wooden Chair",
        "type": "woodenChair",
        "images": [],
        "materials": [
            {
                "id": 1,
                "modelId": 1,
                "name": "Cussion",
                "color": null,
                "texture": 0,
                "repeate": 20.0,
                "visible": true
            }
        ]
    },
    {
        "id": 2,
        "price": 800.0,
        "name": "Office Tables",
        "type": "officeTable",
        "images": [],
        "materials": [
            {
                "id": 2,
                "modelId": 2,
                "name": "TopCussion",
                "color": null,
                "texture": 0,
                "repeate": 20.0,
                "visible": true
            },
            {
                "id": 3,
                "modelId": 2,
                "name": "BtmCussion",
                "color": null,
                "texture": 0,
                "repeate": 20.0,
                "visible": true
            }
        ]
    },
    {
        "id": 3,
        "price": 850.0,
        "name": "Sofa",
        "type": "sofa",
        "images": [],
        "materials": [
            {
                "id": 4,
                "modelId": 3,
                "name": "Pillow",
                "color": null,
                "texture": 0,
                "repeate": 20.0,
                "visible": true
            },
            {
                "id": 5,
                "modelId": 3,
                "name": "Seat",
                "color": null,
                "texture": 0,
                "repeate": 20.0,
                "visible": true
            },
            {
                "id": 6,
                "modelId": 3,
                "name": "Frame",
                "color": null,
                "texture": 0,
                "repeate": 20.0,
                "visible": true
            }
        ]
    },
    {
        "id": 4,
        "price": 850.0,
        "name": "Picnic Table",
        "type": "picnicTable",
        "images": [],
        "materials": [
            {
                "id": 7,
                "modelId": 4,
                "name": "Table",
                "color": null,
                "texture": 0,
                "repeate": 20.0,
                "visible": true
            }
        ]
    }
]);

  const handleAddToCart = (data) => {
    // Update the array by adding the new data
    var isPresent = false;
    for (let index = 0; index < snap.orderDetail.length; index++) {
      if (snap.orderDetail[index].product.id == data.id) {
        isPresent = true;

        const newArray = [...snap.orderDetail];
        newArray[index] = {
          ...newArray[index],
          amount: snap.orderDetail[index].amount + 1
        };
        state.orderDetail = newArray;
      }

    }

    if (!isPresent) {
      state.orderDetail = [...snap.orderDetail, {
        amount: 1,
        price: data.price,
        product: data
      }];
    }

  };
  useEffect(() => {
    Aos.init();
    const fetchData = async () => {

      try {
        // const response = await axios.get('http://localhost:8080/model');
        // setGeometries(response.data);

      } catch (error) {

      }

    }

    fetchData();
  }, []);
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const handleEdit = (data) => {
    state.geometry = data;
    state.navButton = 5;
    navigate('/motion-test/customizer')
  }
  const handleView = (data) => {
    state.geometry = data;
    state.navButton = 4;
    navigate('/motion-test/details')
  }



  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 d-flex align-items-center justify-content-center">
          <p>
            <h1 data-aos="fade-down-right" data-aos-duration="1000" className='text-center' style={{ color: snap.themeColor }}>Welcome to Thiwanka Reiss Show room</h1>
            <br></br>
            <h5 data-aos="fade-up" data-aos-duration="2000">Hope you have an inovative and enjoyable experience with us</h5>
          </p>
  
        </div>
        <div className="col-lg-7">
          <div data-aos="zoom-in" data-aos-duration="3000" id="carouselExampleAutoplaying" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">

                <div className='w-100'>
                  <CarouselItm
                    image={"loginback.jpg"}
                    mainheading={"3D"}
                    subheading={"View Products As 3d"}
                    description={`Click on 3d to view product as 3d`}>
                  </CarouselItm>
                </div>
              </div>
              <div class="carousel-item">
                <CarouselItm
                  image={"loginback.jpg"}
                  mainheading={"AR"}
                  subheading={"Vew Products in Augmented Reality"}
                  description={`Click on AR to view product in your home environment`}>
                </CarouselItm>
              </div>
              <div class="carousel-item">
                <CarouselItm
                  image={"loginback.jpg"}
                  mainheading={"Album"}
                  subheading={"Vew Products as Album"}
                  description={`Click on book to view product images`}>
                </CarouselItm>
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

      </div>
      <div className="row d-flex justify-content-center">

        {geometries && geometries.map((data) => (
          <div className="col-lg-3 m-3 model-container" style={{ border: `2px solid ${snap.themeColor}` }}>
            <Sorter model={data.type} geos={data.materials}></Sorter>
            <div style={{ position: 'absolute', top: '5%', right: '60%', color: snap.themeColor }} className='desc-container-2 d-flex align-items-center justify-content-center'>
              Rs.{data.price}/=
            </div>
            <div style={{ position: 'absolute', top: '83%', right: '60%', color: snap.themeColor }} className='d-flex align-items-center justify-content-center'>
              {data.name}
            </div>
            <div className='buttons-container'>
              {snap.customer && (snap.customer.status == "admin" || snap.customer.status == "employee") && (
                <button className='btn btn-sm btn-outline-warning m-1' onClick={() => { handleEdit(data) }}><i class="bi bi-pen"></i></button>
              )}
              <button className='btn btn-sm btn-outline-success m-1' onClick={() => { handleView(data) }}><i class="bi bi-eye-fill"></i></button>
              <button className='btn btn-sm btn-outline-info m-1' onClick={() => { handleAddToCart(data) }}><i class="bi bi-cart-dash"></i></button>
            </div>
          </div>
        ))}
        <div className='col-lg-12 col-md-3 col-sm-10  mb-3'  >
          {state.orderDetail.length > 0 &&
            <div className='bill-container' style={{ border: `2px solid ${snap.themeColor}` }}>
              <SideBill />
            </div>
          }

        </div>

      </div>


    </div>

  )
}

export default Products