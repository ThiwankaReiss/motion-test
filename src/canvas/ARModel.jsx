// ARModel.js
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import Chair from './Chair';
import ARCamRig from './ARCamRig';

const ARModel = ({ avgIntensity, lightX, lightY }) => {
    const adjustedIntensity = avgIntensity / 12; // Normalize intensity to range 0-1
    const [position, setPosition] = useState([0, 0, 0]);
    const [rot, setRotation] = useState([0, 0,0]);

    useEffect(() => {
        const requestPermissions = async () => {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const response = await DeviceOrientationEvent.requestPermission();
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    } else {
                        console.error('DeviceOrientationEvent permission not granted');
                    }
                } catch (error) {
                    console.error('Error requesting DeviceOrientationEvent permission', error);
                }
            } else {
                window.addEventListener('deviceorientation', handleOrientation);
            }

            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                try {
                    const response = await DeviceMotionEvent.requestPermission();
                    if (response === 'granted') {
                        window.addEventListener('devicemotion', handleMotion);
                    } else {
                        console.error('DeviceMotionEvent permission not granted');
                    }
                } catch (error) {
                    console.error('Error requesting DeviceMotionEvent permission', error);
                }
            } else {
                window.addEventListener('devicemotion', handleMotion);
            }
        };

        requestPermissions();

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, []);

    const handleOrientation = (event) => {
        setRotation([event.alpha * (Math.PI / 180), event.beta * (Math.PI / 180), event.gamma * (Math.PI / 180)]);
    };

    const handleMotion = (event) => {
        const acceleration = event.acceleration;
        const deltaTime = event.interval / 1000; // Convert to seconds

        if (acceleration) {
            setPosition(prevPosition => {
                const newPosition = [
                    prevPosition[0] + acceleration.x * deltaTime ** 2 / 2,
                    prevPosition[1] + acceleration.y * deltaTime ** 2 / 2,
                    prevPosition[2] + acceleration.z * deltaTime ** 2 / 2
                ];
                return newPosition;
            });
        }
    };

    return (
        
        <>
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 20 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <spotLight position={[lightX, lightY, 5]} intensity={adjustedIntensity}></spotLight>
            <Environment preset='city' />
            <ARCamRig cameraCoordinates={[position[0]*1000,position[1]*1000,position[2]*1000+20]} rotation={rot}>
                <Center>
                    <Chair />
                </Center>
            </ARCamRig>
        </Canvas>
        <div>
            <p>
              {position[0]*1000} , {position[1]*1000},{position[2]*1000+20}, {rot}
            </p>
        </div>
        </>
    );
};

export default ARModel;