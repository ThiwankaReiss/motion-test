import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import Chair from './Chair'
import ARCamRig from './ARCamRig'


const ARModel = ({ avgIntensity, lightX, lightY }) => {
    const adjustedIntensity = avgIntensity / 12; // Normalize intensity to range 0-1
    const [position, setPosition] = useState([0, 0, 0]);

    useEffect(() => {
        // Check for permissions and request if necessary
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
                // No need to request permission for non-iOS devices
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
                // No need to request permission for non-iOS devices
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
        console.log(event);
        console.log('Orientation:', event.alpha, event.beta, event.gamma);
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
                console.log('Position:', newPosition);
                return newPosition;
            });
        }
    }

    return (
        <Canvas
            shadows
            camera={{ position: [0+(position[0]*1000), 0+(position[1]*1000), 0+(position[2]*1000)], fov: 20 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <spotLight position={[lightX, lightY, 5]} intensity={adjustedIntensity}></spotLight>


            <Environment preset='city' />

            <ARCamRig cameraCordinates={[0, 0, 20]}>
                <Center>
                    <Chair />
                </Center>
            </ARCamRig>
        </Canvas>
    )
}

export default ARModel;
