import React, { useEffect, useRef, useState } from 'react';
import CanvasModel from '../../canvas/CanvasModel';
import ARModel from '../../canvas/ARModel';

const AugmentedView = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const [avgIntensity, setAvgIntensity] = useState(1);
    const [lightX, setLightX] = useState(0);
    const [lightY, setLightY] = useState(0);

    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setIsCameraEnabled(true);
                }
            } catch (error) {
                console.error('Error accessing the camera', error);
            }
        };

        enableCamera();
    }, []);

    useEffect(() => {
        if (isCameraEnabled) {
            const calculateLightIntensity = () => {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Divide the frame into a grid
                const gridSize = 10;
                const cellWidth = canvas.width / gridSize;
                const cellHeight = canvas.height / gridSize;

                let maxIntensity = 0;
                let lightDirection = { x: 0, y: 0 };

                for (let x = 0; x < gridSize; x++) {
                    for (let y = 0; y < gridSize; y++) {
                        let totalIntensity = 0;
                        let pixelCount = 0;

                        for (let i = 0; i < cellWidth; i++) {
                            for (let j = 0; j < cellHeight; j++) {
                                const pixelIndex = ((y * cellHeight + j) * canvas.width + (x * cellWidth + i)) * 4;
                                const r = data[pixelIndex];
                                const g = data[pixelIndex + 1];
                                const b = data[pixelIndex + 2];
                                const intensity = (r + g + b) / 3;
                                totalIntensity += intensity;
                                pixelCount++;
                            }
                        }

                        const averageIntensity = totalIntensity / pixelCount;
                        if (averageIntensity > maxIntensity) {
                            maxIntensity = averageIntensity;
                            lightDirection = { x, y };
                        }
                    }
                }

                setLightX(lightDirection.x);
                setLightY(lightDirection.y);
                setAvgIntensity(maxIntensity);
            };

            const lightIntensityIntervalId = setInterval(calculateLightIntensity, 1000);

            return () => clearInterval(lightIntensityIntervalId);
        }
    }, [isCameraEnabled]);

    return (
        <div className='position-relative col-lg-8 col-md-8 col-sm-8 w-100' style={{ height: '445px' }}>
            <video
                ref={videoRef}
                className='position-absolute w-100 h-100'
                style={{ top: 0, left: 0, objectFit: 'cover' ,overflow :'hidden'}}
            />
            <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
                width={640}
                height={480}
            />
            <ARModel avgIntensity={avgIntensity} lightX={lightX} lightY={lightY} />
        </div>
    );
};

export default AugmentedView;
