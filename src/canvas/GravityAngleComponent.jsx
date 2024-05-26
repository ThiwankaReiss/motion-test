import React, { useState, useEffect } from 'react';

const GravityAngleComponent = () => {
  const [angle, setAngle] = useState(0);

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

  return (
    <div>
      <h1>Angle with respect to gravity</h1>
      <p>{angle[0]} degrees</p>
      <p>{angle[1]} degrees</p>
      <p>{angle[2]} degrees</p>

    </div>
  );
};

export default GravityAngleComponent;