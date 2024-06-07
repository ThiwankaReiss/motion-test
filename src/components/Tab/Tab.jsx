
import React, { useState, useRef, useEffect } from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
const Tab = ({ setColor, currentColor, text ,top }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorPickerRef = useRef(null);
   
    useEffect(() => {
        function handleClickOutside(event) {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [colorPickerRef]);
    function addPicker(pick) {
        console.log(pick);
        setShowColorPicker(!pick);
    }

    return (
        <div className="container-fluid m-1 p-0 g-0" ref={colorPickerRef}>
            <div className="row m-0 p-0 g-0">
                <div className="col-8 text-primary d-flex align-items-center">
                    {text}
                </div>

                <div className="col-4 d-flex justify-content-end">
                    <button  onClick={() => { addPicker(showColorPicker) }} className='btn btn-light p-1 m-0' >
                        <img height="40px" src="assets/colorPickerImage.jpg" alt="Color Picker"></img>
                    </button>
                   
                </div>
                {showColorPicker && (
                    <div>
                        <ColorPicker setColor={setColor} currentColor={currentColor} top={top}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tab