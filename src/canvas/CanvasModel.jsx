import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center, RandomizedLight } from '@react-three/drei'
import CameraRig from './CameraRig'

import Backdrop from './Backdrop.jsx'
import Chair from './Chair.jsx'

const CanvasModel = () => {
    return (

        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 20 }}
            gl={{ preserveDrawingBuffer: true }}

        >
            <ambientLight intensity={0.3} position={[0, 0, -10]} />
           

            <Environment preset='city' />
        
            <CameraRig cameraCordinates={[0, 0, 20]}>
                <Backdrop></Backdrop>
               
                <Center>

                    <Chair></Chair>


                </Center>
            </CameraRig>

        </Canvas>


    )
}

export default CanvasModel