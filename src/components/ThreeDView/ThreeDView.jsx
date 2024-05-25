import React, { useEffect, useRef, useState } from 'react'
import CanvasModel from '../../canvas/CanvasModel'
const ThreeDView = () => {

    const videoRef = useRef(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsCameraEnabled(true);
            } catch (error) {
                console.error('Error accessing the camera', error);
            }
        };

        enableCamera();
    }, []);
    return (
        <div className='position-relative col-lg-8 col-md-8 col-sm-8  w-100'style={{ height: '445px' }}>
            <video
                ref={videoRef}
                className='position-absolute w-100 h-100'
                style={{ top: 0, left: 0, objectFit: 'cover' }}
            />
            <CanvasModel />
        </div>
    )
}

export default ThreeDView