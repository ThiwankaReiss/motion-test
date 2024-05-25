// ARCamRig.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const ARCamRig = ({ children, cameraCoordinates, rotation }) => {
    const group = useRef();

    useFrame((state, delta) => {
        // Set the initial position and rotation of the camera based on device motion
        const targetPosition = cameraCoordinates;
        const targetRotation = rotation;

        // Smoothly interpolate the camera position and rotation
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
        easing.dampE(state.camera.rotation, targetRotation, 0.25, delta);
    });

    return <group ref={group}>{children}</group>;
};

export default ARCamRig;
