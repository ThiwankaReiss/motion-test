import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropList from '../DropList/DropList';
import Swal from 'sweetalert2';
import state from '../../store';
import { useSnapshot } from 'valtio';

const CustomerTable = () => {
    const snap = useSnapshot(state)
    const [customers, setCustomers] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [status, setStatus] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleDeleteCustomer = () => {
        if (selectedCustomer.id == 1) {
            Swal.fire({
                icon: "error",
                title: "Master Admin!",
                text: "Master admin cannot be deleted.",
            });
        } else {
            Swal.fire('Please wait');
            Swal.showLoading();
            axios.delete(`http://localhost:8080/user/${selectedCustomer.id}`)
                .then(function (response) {
                    if (response.data) {
                        Swal.fire({
                            title: "Success!",
                            text: "Deleted Successfully",
                            icon: "success"
                        });
                        Swal.hideLoading();
                        setSelectedCustomer(null);
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
                    console.error('Error deleting customer:', error);
                });
        }

    };

    const handleSetCustomer = (data) => {
        setStatus(data.status);
        setSelectedCustomer(data);
    };

    const handleChangeStatus = () => {
        Swal.fire('Please wait');
        Swal.showLoading();
        axios.post('http://localhost:8080/user', {
            id: selectedCustomer.id,
            email: selectedCustomer.email,
            password: selectedCustomer.password,
            status: status
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
                    setSelectedCustomer(null);
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
                console.error('Error updating customer:', error);
            });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
                setCustomers(null);
            }
        };

        fetchUsers();
    }, [refresh]);

    return (
        <div className="container">
            <div className="row">
                {snap.customer && (snap.customer.status == "employee" || snap.customer.status == "admin")
                    &&
                    <table className="table text-center table-bordered mt-3 mb-3">
                        <thead>
                            <tr>
                                <th scope='col'>Id</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Status</th>
                                {snap.customer.status == "admin" && <th scope='col'>Option</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {customers && customers.map((data) => (
                                <tr key={data.id}>
                                    <th>{data.id}</th>
                                    <td>{data.email}</td>
                                    <td>{data.status}</td>
                                    {snap.customer.status == "admin" &&
                                        <td>
                                            <button className='btn btn-sm btn-primary m-1' data-bs-toggle="modal" data-bs-target="#exampleModal2"
                                                onClick={() => { handleSetCustomer(data) }}>
                                                <i className="b bi-pen"></i>
                                            </button>
                                            <button className='btn btn-sm btn-danger m-1'
                                                data-bs-toggle="modal" data-bs-target="#exampleModal1"
                                                onClick={() => { setSelectedCustomer(data) }}>
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            {/* modal1 */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Click confirm to delete this product.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => { handleDeleteCustomer() }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal2 */}
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Status</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <DropList array={["customer", "employee", "admin"]} topic={"Update Status"} setter={setStatus} current={status}></DropList>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleChangeStatus}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerTable;
