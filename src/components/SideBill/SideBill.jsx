import React, { useEffect, useState } from 'react'
import state from '../../store';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
const SideBill = () => {
    const snap = useSnapshot(state);
    const [total, setTotal] = useState(0.00);
    
    const navigate = useNavigate();
    const handleDropcart=()=>{
        state.orderDetail=[];
    }
    const handleCheckout=()=>{
        if(snap.customer==null){
            state.ckeckout=true;
            state.navButton=2;
            navigate('/motion-test/login');
        }else{
            state.navButton=0;
            navigate('/motion-test/checkout')
        }
    }
    useEffect(() => {
        var tot = 0;
        snap.orderDetail.forEach(element => {
            tot += element.price * element.amount;
        });
        setTotal(tot);
    }, [snap.orderDetail])
    return (
        <>
            {snap.orderDetail && snap.orderDetail.length > 0 &&
                (<div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3>Cart</h3>
                        </div>
                        <div className="col-6">Name</div>
                        <div className="col-3">Qty</div>
                        <div className="col-3">Price(1)</div>

                        {
                            snap.orderDetail.map((data) => (
                                <>
                                    <div className="col-6">{data.product.name}</div>
                                    <div className="col-3">{data.amount}</div>
                                    <div className="col-3">{data.price}</div>
                                </>
                            ))
                        }
                        <hr className='m-0'></hr>
                        <div className="col-5">
                            Total
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <div>
                                {total}
                            </div>
                        </div>
                        <hr className='m-1'></hr>
                        <hr className='m-0' ></hr>

                        <div className="col-4"></div>
                        <div className="col-12 d-flex justify-content-end">
                            <button className='btn btn-sm btn-outline-dark m-2' onClick={handleDropcart}>Drop Cart</button>
                            <button className='btn btn-sm btn-outline-success m-2' onClick={handleCheckout}>Chekout</button>
                        </div>
                        
                    </div>
                </div>)
            }
        </>

    )
}

export default SideBill