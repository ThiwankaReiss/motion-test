// ARCamRig.js
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const ARCamRig = ({ children, cameraCoordinates }) => {
    const group = useRef();
    const [angle, setAngle] = useState([0,0,0]);

  useEffect(() => {
    const handleOrientation = (event) => {
      const { alpha, beta, gamma } = event;

      // Calculate the angle between the device and the direction of gravity
      // Here, we assume beta (front-to-back tilt in degrees) gives us the desired angle
      const gravityAngle = [alpha,beta,gamma];

      setAngle(gravityAngle);
    };

    window.addEventListener('deviceorientation', handleOrientation);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

    useFrame((state, delta) => {
        // Set the initial position and rotation of the camera based on device motion
        const targetPosition = cameraCoordinates;
        // Smoothly interpolate the camera position and rotation
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
        if(angle[0]==0 && angle[1]==0 && angle[2]==0){
          easing.dampE(
            group.current.rotation,
            [state.pointer.y / 6, -state.pointer.x / 0.8, 0],
            0.25,
            delta
          )
        }else{
          easing.dampE(
            group.current.rotation,
            [Math.PI/2-Math.PI*(angle[1]/180),-state.pointer.x / 0.8, Math.PI*(angle[2]/180)],
            0.25,
            delta
          )
        }
        
    });

    return <group ref={group}>{children}</group>;
};

export default ARCamRig;
