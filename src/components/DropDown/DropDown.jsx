import React from 'react'

const DropDown = ({text,adjustActiveTab,tab}) => {
    
    return (
        <button className="btn btn-outline-secondary w-100 mt-1" type="button" onClick={() => adjustActiveTab(tab)}>
            <div className="container-fluid m-0 p-0 g-0">
                <div className="row m-0 p-0 g-0">
                    <div className="col-8 d-flex align-items-center">
                        {text}
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <i className="bi bi-caret-down"></i>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default DropDown