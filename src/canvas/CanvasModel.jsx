import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center, RandomizedLight } from '@react-three/drei'
import CameraRig from './CameraRig'

import Backdrop from './Backdrop.jsx'

import Sofa from '../components/ThreeDModels/Sofa.jsx'
import OficeTable from '../components/ThreeDModels/OficeTable.jsx'
import PicnicTable from '../components/ThreeDModels/PicnicTable.jsx'
import WoodenChair from '../components/ThreeDModels/WoodenChair.jsx'

const CanvasModel = ({ model ,geos,imgArray}) => {
    return (

        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 20 }}
            gl={{ preserveDrawingBuffer: true }}

        >
            <ambientLight intensity={0.3} position={[0, 0, -10]} />


            <Environment preset='city' />

            <CameraRig cameraCordinates={[0, 0, 50]}>

                
                <Center>
                    
                    {model && model == "sofa" && (
                        <Sofa geos={geos} imgArray={imgArray}></Sofa>
                    )}
                    {model && model == "officeTable" && (
                        <OficeTable geos={geos} imgArray={imgArray}></OficeTable>
                    )}
                    {model && model == "picnicTable" && (
                        <PicnicTable geos={geos} imgArray={imgArray}></PicnicTable>
                    )}
                    {model && model == "woodenChair" && (
                        <WoodenChair geos={geos} imgArray={imgArray}></WoodenChair>
                    )}
                    {/* <Sofa></Sofa> */}
                </Center>
                <Backdrop></Backdrop>
            </CameraRig>

        </Canvas>


    )
}

export default CanvasModel