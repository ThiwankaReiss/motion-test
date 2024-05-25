import React, { useEffect, useState } from 'react';

const Motion = () => {
  const [position, setPosition] = useState([0, 0, 0]);
  const [pos, setPos]=useState([0,0,0]);
  const [rot ,setRot]=useState([0,0,0]);
console.log(position)
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
    console.log('Orientation:', event.alpha, event.beta, event.gamma);
    setRot([event.alpha, event.beta, event.gamma]);
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
        setPos(newPosition);
        return newPosition;
      });
    }
  };

  return (
    <div>
      <h1>Device Position</h1>
      <p>alpha {rot[0]} </p>
      <p>beta {rot[1]}</p>
      <p>gamma {rot[2]}</p>
      <p>x {pos[0]}</p>
      <p>y {pos[1]}</p>
      <p>z {pos[2]}</p>
    </div>
  );
};

export default Motion;