import React, { useEffect, useState } from 'react'
import state from '../../store'
import { useSnapshot } from 'valtio'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const Checkout = () => {
    const navigate = useNavigate();
    const snap = useSnapshot(state);
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [selectedItm, setSelectedItm] = useState(null);
    const [total, setTotal] = useState(0.00);

    const handleDelete = () => {
        const newItems = snap.orderDetail.filter((item, i) => i !== selectedItm);
        state.orderDetail = newItems;
    }
    const submit = async (data) => {
        const newArray = [...snap.orderDetail];
        newArray[selectedItm] = {
            ...newArray[selectedItm],
            amount: data.amount
        };
        state.orderDetail = newArray;
    }
    const handlePlaceOrder = () => {
        Swal.fire('Please wait')
        Swal.showLoading();
        axios.post('http://localhost:8080/order', {

            user: snap.customer,
            total: total,
            detail: snap.orderDetail
        })
            .then(function (response) {


                if (response.data != null && response.data != '') {

                    
                    Swal.fire({
                        title: "Sucess!",
                        text: "Registration Sucessfully!",
                        icon: "success"
                    });
                    Swal.hideLoading();

                    state.orderDetail = [];
                    state.navButton = 6;
                    navigate('/motion-test/orders')
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
    useEffect(() => {
        var tot = 0;
        snap.orderDetail.forEach(element => {
            tot += element.price * element.amount;
        });
        setTotal(tot);
    }, [snap.orderDetail])

    return (
        <div className="container">
            <div className="row mt-3 text-end">
                <h3>Total : Rs {total}/=</h3>
            </div>
            <div className="row">

                <table class="table text-center table-bordered mt-3">
                    <thead>
                        <tr >
                            <th scope='col' >Name</th>
                            <th scope='col'>Unit Price</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {snap.orderDetail && snap.orderDetail.map((data, index) => (
                            <tr>
                                <th>{data.product.name}</th>
                                <td>{data.product.price}</td>
                                <td>{data.amount}</td>
                                <td>{data.price * data.amount}</td>
                                <td className='d-flex justify-content-center' onClick={() => { setSelectedItm(index) }} data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                    <boutton className='btn btn-light p-0 '>
                                        <i class="bi bi-exposure text-primary"></i>
                                    </boutton>
                                    &nbsp;&nbsp;
                                    <boutton className='btn btn-light p-0' onClick={() => { setSelectedItm(index) }} data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                        <i class="bi bi-trash text-danger"></i>
                                    </boutton>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div className='col-12 d-flex justify-content-end'>
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal3"
                        style={{
                            backgroundColor: snap.themeColor, padding: "5px",
                            borderRadius: "10px", color: "white"
                        }}
                    >
                        Place Order
                    </button>
                </div>

            </div>



            {/* modal 1 */}
            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Romove Product From Order</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Confirm to remove this from bill
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal 2 */}
            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Change Quantity</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex align-items-center">
                            <label >Amount : &nbsp;</label>
                            <input
                                type="text"
                                class="form-control w-50"
                                id="inputPassword"
                                placeholder="amount"

                                {...register("amount", { required: true, pattern: /^(?!0+$)\d+$/ })}
                            ></input>
                            {errors && errors.amount && (<p>Enter valid amount</p>)}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss={!errors.amount && 'modal'} onClick={handleSubmit(submit)}>Confirm</button>
                        </div>

                    </div>
                </div>
            </div>
            {/* modal31 */}
            <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Confirm Order</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Please Confirm Your Order
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handlePlaceOrder}>Confim</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout