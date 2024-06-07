import React, { useState } from "react"
import OrdersTable from "../../components/OrdersTable/OrdersTable"
import state from "../../store"
import { useSnapshot } from "valtio"
import './Order.css'
import { useForm } from "react-hook-form"
const Orders = () => {

    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const snap = useSnapshot(state);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedId, setSelectedId] = useState(null);
    const handleChecked = (data) => {
        setActiveTab(data);
        reset();
        setSelectedId(null);
    }
    const submit = async (data) => {
        setSelectedId(data.id)
    }
    return (
        <div className="container">
            {snap.customer && snap.customer.status == 'customer' &&
                <OrdersTable customerId={snap.customer.id}></OrdersTable>
            }
            {snap.customer && (snap.customer.status == 'admin' || snap.customer.status == 'employee') &&
                <>
                    <div className="row m-3">
                        <div class="radio-inputs">
                            <label class="radio">
                                <input type="radio" name="radio" checked={activeTab == 1} onClick={() => { handleChecked(1) }} />
                                <span class="name">Your Orders</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="radio" checked={activeTab == 2} onClick={() => { handleChecked(2) }} />
                                <span class="name">Orders By Customer Id</span>
                            </label>

                            <label class="radio">
                                <input type="radio" name="radio" checked={activeTab == 3} onClick={() => { handleChecked(3) }} />
                                <span class="name">All Orders</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="radio" checked={activeTab == 4} onClick={() => { handleChecked(4) }} />
                                <span class="name">Order By Id</span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        {activeTab == 1 && <OrdersTable customerId={snap.customer.id}></OrdersTable>}
                        {activeTab == 2 && (
                            <>
                                <div className="col-lg-12">
                                    <div class="d-flex align-items-center">
                                        <label >Customer Id : &nbsp;</label>
                                        <input
                                            type="text"
                                            class="form-control w-50"
                                            id="inputPassword"
                                            placeholder="customer ID"

                                            {...register("id", { required: true, pattern: /^(?!0+$)\d+$/ })}
                                        ></input>
                                        {errors && errors.id && (<p>Enter valid customer Id</p>)}
                                        <button className="btn btn-outline-primary m-2" onClick={handleSubmit(submit)}>Search</button>
                                    </div>
                                </div>
                                {selectedId && <OrdersTable customerId={selectedId}></OrdersTable>}
                            </>

                        )}
                        {activeTab == 3 && <OrdersTable all={true}></OrdersTable>}
                        {activeTab == 4 && (
                            <>
                                <div className="col-lg-12">
                                    <div class="d-flex align-items-center">
                                        <label >Order Id : &nbsp;</label>
                                        <input
                                            type="text"
                                            class="form-control w-50"
                                            id="inputPassword"
                                            placeholder="Order ID"

                                            {...register("id", { required: true, pattern: /^(?!0+$)\d+$/ })}
                                        ></input>
                                        {errors && errors.id && (<p>Enter valid customer Id</p>)}
                                        <button className="btn btn-outline-primary m-2" onClick={handleSubmit(submit)}>Search</button>
                                    </div>
                                </div>
                                {selectedId && <OrdersTable byId={selectedId}></OrdersTable>}
                            </>
                        )}
                    </div>
                </>

            }

        </div>
    )
}

export default Orders