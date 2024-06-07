import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sorter from '../Sorters/Sorter';
import state from '../../store';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductTable = () => {
    const snap = useSnapshot(state);
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (data) => {
        state.geometry = data;
        state.navButton = 5;
        navigate('/motion-test/customizer');
    };

    const handleDelete = () => {
        if (selectedProduct > 4) {
            axios.delete(`http://localhost:8080/model/${selectedProduct}`)
                .then(function (response) {
                    if (response.data) {
                        Swal.fire({
                            title: "Success!",
                            text: "Deleted Successfully",
                            icon: "success"
                        });
                        setSelectedProduct(null);
                        setRefresh(!refresh); // Toggle refresh state to re-run useEffect
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Failed!",
                            text: "Something went wrong",
                        });
                    }
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Failed to delete product.",
                    });
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Base Model!",
                text: "Base models can't be deleted. Please delete created model.",
            });
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/model`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [refresh]); // Add refresh to the dependency array

    return (
        <div className="container">
            <div className="row">
                <table className="table text-center table-bordered mt-3 mb-3">
                    <thead>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Model</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((data) => (
                            <tr key={data.id}>
                                <th>{data.id}</th>
                                <td className='container-width-change'>
                                    <Sorter geos={data.materials} model={data.type}></Sorter>
                                </td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>
                                    <button className='btn btn-sm btn-primary m-1' onClick={() => handleEdit(data)}><i className="bi bi-pen"></i></button>
                                    <button className='btn btn-sm btn-danger m-1' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => setSelectedProduct(data.id)}><i className="bi bi-trash3"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* modal2 */}
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default ProductTable;
