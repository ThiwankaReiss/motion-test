import './NavBar.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSnapshot } from 'valtio'
import state from '../../store'
import Tab from '../Tab/Tab';
import bootstrap from  'bootstrap/dist/js/bootstrap.min.js'
export default function NavBar({ navButton }) {
    console.log(navButton);
    const [hoverBtn, sethoverBtn] = useState(null);
    const [selectedBtn, setSelectedBtn] = useState(navButton);
    const snap = useSnapshot(state);
    const [themeColor, setThemeColor] = useState(snap.themeColor);
    const getThemeColor = (col) => {
        state.themeColor = col;
        setThemeColor(col);
    };

   
    useEffect(() => {
        setSelectedBtn(navButton);
        console.log(navButton);
        const toastEl = document.getElementById('liveToast');
        if (toastEl) {
            const toastBootstrap = new bootstrap.Toast(toastEl);
            toastBootstrap.show();
        }
    }, [navButton]);
    return (

        <>
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: themeColor,zIndex:880 }}>
                <div className="container-fluid">
                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse add-margins-nav" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto  mb-2 mb-lg-0 w-100 d-flex justify-content-around">
                            <li className="nav-item nav-bar-itm itm-link">
                                <Link to="/motion-test/"
                                    onClick={() => { setSelectedBtn(1); state.navButton=1 }}
                                    onMouseEnter={() => { sethoverBtn(1) }}
                                    onMouseLeave={() => { sethoverBtn(null) }}
                                    className={`nav-link ${(hoverBtn || selectedBtn) && (hoverBtn === 1 || selectedBtn == 1) ? 'selected-txt' : 'un-selected-txt'}`}
                                    aria-current="page">
                                    <i class="bi bi-boxes"></i> Products
                                </Link>
                                {(hoverBtn || selectedBtn) && (hoverBtn === 1 || selectedBtn == 1) && (<div className='shadow-bellow'></div>)}
                            </li>
                            <li className="nav-item itm-link">
                                <Link to="/motion-test/login"
                                    onClick={() => { setSelectedBtn(2); state.navButton=2 }}
                                    onMouseEnter={() => { sethoverBtn(2) }}
                                    onMouseLeave={() => { sethoverBtn(null) }}
                                    className={`nav-link  ${(hoverBtn || selectedBtn) && (hoverBtn === 2 || selectedBtn == 2) ? 'selected-txt' : 'un-selected-txt'}`}
                                    aria-current="page">
                                    <i class="bi bi-box-arrow-in-right"></i> Login
                                </Link>
                                {(hoverBtn || selectedBtn) && (hoverBtn === 2 || selectedBtn == 2) && (<div className='shadow-bellow'></div>)}

                            </li>
                            <li className="nav-item itm-link">
                                <Link to="/motion-test/register"
                                    onClick={() => { setSelectedBtn(3); state.navButton=3  }}
                                    onMouseEnter={() => { sethoverBtn(3) }}
                                    onMouseLeave={() => { sethoverBtn(null) }}
                                    className={`nav-link  ${(hoverBtn || selectedBtn) && (hoverBtn === 3 || selectedBtn == 3) ? 'selected-txt' : 'un-selected-txt'}`}
                                    aria-current="page">
                                    <i class="bi bi-box-arrow-in-up"></i> Register
                                </Link>
                                {(hoverBtn || selectedBtn) && (hoverBtn === 3 || selectedBtn == 3) && (<div className='shadow-bellow'></div>)}
                            </li>
                            
                            <li className="nav-item itm-link">
                                <Link to="/motion-test/details"
                                    onClick={() => { setSelectedBtn(4); state.navButton=4  }}
                                    onMouseEnter={() => { sethoverBtn(4) }}
                                    onMouseLeave={() => { sethoverBtn(null) }}
                                    className={`nav-link  ${(hoverBtn || selectedBtn) && (hoverBtn === 4 || selectedBtn ==4) ? 'selected-txt' : 'un-selected-txt'}`}
                                    aria-current="page">
                                    <i class="bi bi-card-text"></i> Details
                                </Link>
                                {(hoverBtn || selectedBtn) && (hoverBtn === 4 || selectedBtn == 4) && (<div className='shadow-bellow'></div>)}
                            </li>
                            <li className="nav-item itm-link">
                                <a
                                    onClick={() => { setSelectedBtn(6) }}
                                    onMouseEnter={() => { sethoverBtn(6) }}
                                    onMouseLeave={() => { sethoverBtn(null) }}
                                    className={`nav-link  ${(hoverBtn || selectedBtn) && (hoverBtn === 6 || selectedBtn == 6) ? 'selected-txt' : 'un-selected-txt'}`}
                                    aria-current="page">
                                    <i class="bi bi-people-fill"></i> Customers
                                </a>
                                {(hoverBtn || selectedBtn) && (hoverBtn === 6 || selectedBtn == 6) && (<div className='shadow-bellow'></div>)}
                            </li>
                            <li className="nav-item itm-link">
                                <a
                                    onClick={() => { setSelectedBtn(7) }}
                                    onMouseEnter={() => { sethoverBtn(7) }}
                                    onMouseLeave={() => { sethoverBtn(null) }}
                                    className={`nav-link  ${(hoverBtn || selectedBtn) && (hoverBtn === 7 || selectedBtn == 7) ? 'selected-txt' : 'un-selected-txt'}`}
                                    aria-current="page">
                                    <i class="bi bi-graph-up-arrow"></i> Orders
                                </a>
                                {(hoverBtn || selectedBtn) && (hoverBtn === 7 || selectedBtn == 7) && (<div className='shadow-bellow'></div>)}
                            </li>
                        </ul>
                    </div>
                    <div >
                        <Tab getColor={getThemeColor} currentColor={themeColor} text=""></Tab>
                    </div>
                </div>
            </nav>
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img height="40px" src="src/assets/noticeIcon.png" class="rounded me-2" alt="..." />
                        <strong class="me-auto">Notice</strong>
                        <button type="button"  class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Click color icon on top <i class="bi bi-arrow-up"></i> to change page <span className='change-color'>color theme</span> 
                    </div>
                </div>
            </div>
        </>
    );
}
