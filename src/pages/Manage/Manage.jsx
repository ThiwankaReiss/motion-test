import React, { useState } from "react"
import OrdersTable from "../../components/OrdersTable/OrdersTable"
import state from "../../store"
import { useSnapshot } from "valtio"

import { useForm } from "react-hook-form"
import CustomerTable from "../../components/CustomerTable/CustomerTable"
import ProductTable from "../../components/ProductTable/ProductTable"
const Manage = () => {

    const snap = useSnapshot(state);
    const [activeTab, setActiveTab] = useState(1);
   
    return (
        <div className="container">
           
            {snap.customer && (snap.customer.status == 'admin' || snap.customer.status == 'employee') &&
                <>
                    <div className="row m-3">
                        <div class="radio-inputs">
                            <label class="radio">
                                <input type="radio" name="radio" checked={activeTab == 1} onClick={() => { setActiveTab(1) }} />
                                <span class="name">View Users</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="radio" checked={activeTab == 2} onClick={() => { setActiveTab(2) }} />
                                <span class="name">View Products</span>
                            </label>

                            
                        </div>
                    </div>
                    <div className="row">
                        {activeTab == 1 && <CustomerTable></CustomerTable>}
                        {activeTab == 2 && (
                            <ProductTable></ProductTable>
                        )}
                       
                    </div>
                </>

            }

        </div>
    )
}
export default Manage