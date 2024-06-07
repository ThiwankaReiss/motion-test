import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sorter from '../../components/Sorters/Sorter';
import './OrdersTable.css';
import state from '../../store';
import { useSnapshot } from 'valtio';
import DropList from '../DropList/DropList';
import Swal from 'sweetalert2';

const OrdersTable = ({ customerId, all, byId }) => {
    const snap = useSnapshot(state);
    const [userOrders, setUserOrders] = useState(null);
    const [status, setStatus] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [refresh, setRefresh] = useState(false); // State to trigger useEffect

    const handleChangeStatus = () => {
        Swal.fire('Please wait');
        Swal.showLoading();
        axios.post('http://localhost:8080/order', {
            id: selectedOrder.id,
            user: selectedOrder.user,
            total: selectedOrder.total,
            date: selectedOrder.date,
            time: selectedOrder.time,
            status: status,
            detail: selectedOrder.detail
        })
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Update Successful",
                        icon: "success"
                    });
                    Swal.hideLoading();
                    setStatus(null);
                    setSelectedOrder(null);
                    setRefresh(!refresh); // Toggle refresh state to re-run useEffect
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
    };

    const handleSelectedOrder = (data) => {
        setStatus(data.status);
        setSelectedOrder(data);
    };

    const handleDeleteOrder = () => {
        axios.delete(`http://localhost:8080/order/${selectedOrder.id}`)
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Deleted Successfully",
                        icon: "success"
                    });
                    Swal.hideLoading();
                    setSelectedOrder(null);
                    setRefresh(!refresh); // Toggle refresh state to re-run useEffect
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
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let response;
                if (customerId != null) {
                    response = await axios.get(`http://localhost:8080/orders/user/${customerId}`);
                } else if (all) {
                    response = await axios.get(`http://localhost:8080/orders`);
                } else if (byId != null) {
                    response = await axios.get(`http://localhost:8080/order/${byId}`);
                }

                if (response?.data) {
                    setUserOrders(Array.isArray(response.data) ? response.data : [response.data]);
                } else {
                    setUserOrders(null);
                }

                
            } catch (error) {
                console.error('Error fetching data:', error);
                setUserOrders(null);
            }
        };

        fetchOrders();
    }, [customerId, all, byId, refresh]); // Add refresh to dependency array

    return (
        <div className="container">
            <div className="row">
                {userOrders && userOrders.map((data) => (
                    <React.Fragment key={data.id}>
                        <div className="col-lg-12">
                            <h5>User Id: {data.user.id} Email: {data.user.email} OrderId: {data.id}</h5>
                        </div>
                        <div className="col-lg-6">
                            <h3>Date/Time: {data.date} / {data.time} {data.status}</h3>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end align-items-center">
                            <h3>Total: {data.total}</h3>
                            {snap.customer && (snap.customer.status === 'admin' || snap.customer.status === 'employee') && (
                                <>
                                    <button className='btn btn-sm btn-outline-primary m-1' data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => { handleSelectedOrder(data) }}>Change Status</button>
                                    <button className='btn btn-sm btn-danger m-1' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { setSelectedOrder(data) }}>Delete Order</button>
                                </>
                            )}
                        </div>
                        <table className="table text-center table-bordered mt-3 mb-3">
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>View</th>
                                    <th scope='col'>Unit Price</th>
                                    <th scope='col'>Quantity</th>
                                    <th scope='col'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.detail && data.detail.map((info, index) => (
                                    <tr key={index}>
                                        <th>{info.product.name}</th>
                                        <td className='container-width-change'>
                                            <Sorter geos={info.product.materials} model={info.product.type}></Sorter>
                                        </td>
                                        <td>{info.price}</td>
                                        <td>{info.amount}</td>
                                        <td>{info.price * info.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </React.Fragment>
                )) || (customerId || all || byId) && (
                    <div>
                        No Records
                    </div>
                )}
                {/* modal1 */}
                <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Order</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <DropList array={["processing", "completed", "delivered"]} topic={"Update Status"} setter={setStatus} current={status}></DropList>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleChangeStatus}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal2 */}
                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Order</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Click confirm to delete this order.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteOrder}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersTable;
