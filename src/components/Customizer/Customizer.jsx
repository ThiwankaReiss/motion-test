import './Customizer.css'
import React, { useEffect, useState } from 'react'
import CanvasModel from '../../canvas/CanvasModel'
import DropDown from '../DropDown/DropDown'
import Tab from '../Tab/Tab'

import PicUpload from '../PicUpload/PicUpload'
import ImgScaler from '../ImgScaler/ImgScaler'
import Sorter from '../Sorters/Sorter'
import state from '../../store'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ImageUploader from '../ImageUploader/ImageUploader'

const Customizer = () => {

    const snap = useSnapshot(state);
    const [activeTab, setActiveTab] = useState(null);
    const [geos, setGeos] = useState(snap.geometry.materials);
    const [image, setImage] = useState(null);
    const [imagesArray, setImagesArray] = useState(snap.geometry.images);
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [activeImage, setActiveImage] = useState(null);

    function adjustActiveTab(tab) {
        setActiveTab(activeTab === tab ? null : tab);
    }

    useEffect(() => {
        if (image !== null && !imagesArray.includes(image)) {
            setImagesArray(prevArray => [...prevArray, image]);
        }
    }, [image]);


    const saveNew = async (data) => {

        Swal.fire('Please wait')
        Swal.showLoading();
        const materials = geos.map(item => ({
            ...item,
            id: null,
            modelId: null
        }));
        axios.post('http://localhost:8080/model', {

            price: data.price,
            name: data.name,
            type: snap.geometry.type,
            images: imagesArray,
            materials: materials
        })
            .then(function (response) {


                if (response.data != null && response.data != '') {


                    Swal.fire({
                        title: "Sucess!",
                        text: "Registration Sucessfully!",
                        icon: "success"
                    });
                    Swal.hideLoading();



                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed!",
                        text: "Something went wrong",
                    });
                    Swal.hideLoading();
                }
            })
            .catch(function (error) {

            });

    }
    const handleDeleteImage = () => {
        if (activeImage == null) {
            alert("click on the image you wish to remove")
        } else {
            const newItems = imagesArray.filter((item, i) => i !== activeImage);
            setImagesArray(newItems);
        }
    }
    const update = async (data) => {
        Swal.fire('Please wait')
        Swal.showLoading();

        axios.post('http://localhost:8080/model', {
            id: snap.geometry.id,
            price: data.price,
            name: data.name,
            type: snap.geometry.type,
            images: imagesArray,
            materials: geos
        })
            .then(function (response) {


                if (response.data != null && response.data != '') {


                    Swal.fire({
                        title: "Sucess!",
                        text: "Registration Sucessfully!",
                        icon: "success"
                    });
                    Swal.hideLoading();



                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed!",
                        text: "Something went wrong",
                    });
                    Swal.hideLoading();
                }
            })
            .catch(function (error) {

            });
    }


    return (
        <div className="container">
            <div className="row mb-4">
                <div className='col-12 d-flex justify-content-end'>
                    <button className='submit-btn-2' data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{ backgroundColor: snap.themeColor }}>Update Product</button>

                    <button className='submit-btn' data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{ backgroundColor: snap.themeColor }}>Save As New Product</button>
                </div>
                <div className="col-lg-4 m-3 customizer-container card">

                    {geos.map((data, index) => (
                        <>
                            <DropDown text={data.name} adjustActiveTab={adjustActiveTab} tab={data.name} />
                            {
                                activeTab && activeTab === data.name && (
                                    <>
                                        <Tab setColor={{
                                            array: geos,
                                            func: setGeos,
                                            edit: index
                                        }} currentColor={data.color} text={data.name + " Color"} />
                                        <PicUpload getImage={{
                                            array: geos,
                                            func: setGeos,
                                            edit: index
                                        }} setShowImage={null} showImage={data.visible} text={data.name + " Image"}></PicUpload>
                                        <ImgScaler showImage={data.visible} Image={data.texture}
                                            setterFunction={{
                                                array: geos,
                                                func: setGeos,
                                                edit: index
                                            }}></ImgScaler>
                                    </>
                                )
                            }
                        </>

                    ))}

                    <div className="container">

                        <div class="form-group row m-1 d-flex align-items-center">
                            <label for="inputPassword" class="col-4 col-form-label">Product Name</label>
                            <div class="col-8">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="inputPassword"
                                    placeholder="name"
                                    value={snap.geometry.name}
                                    onClick={() => { state.geometry.name = null }}
                                    {...register("name", { required: true })}
                                ></input>
                                {errors && errors.name && (<p>Enter valid name</p>)}
                            </div>
                        </div>
                        <div class="form-group row m-1 d-flex align-items-center">
                            <label for="inputPassword" class="col-4 col-form-label">Price</label>
                            <div class="col-8">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="inputPassword"
                                    placeholder="name"
                                    value={snap.geometry.price}
                                    onClick={() => { state.geometry.price = null }}
                                    {...register("price", { required: true, pattern: /^\d+(\.\d+)?$/ })}
                                ></input>
                                {errors && errors.price && (<p>Enter valid price</p>)}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-7 m-3 canvas-container ">
                    <Sorter geos={geos} model={snap.geometry.type}></Sorter>
                    {/* <CanvasModel model={"officeTable"}></CanvasModel> */}
                </div>

                <div className='col-lg-6 model-container-2'>
                    <ImageCarousel imagesArray={imagesArray} getImgActive={setActiveImage}></ImageCarousel>
                    <div className='buttons-container-2'>
                        <ImageUploader setImage={setImage}></ImageUploader>
                        <button className='btn btn-light m-1' onClick={handleDeleteImage}><i class="bi bi-dash-circle"></i></button>
                    </div>

                </div>




                {/* modal1 */}
                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Save New Product</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Confirm to save this as a new product
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit(saveNew)} >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal2 */}
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Confirm to update this product
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit(update)} >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customizer;
