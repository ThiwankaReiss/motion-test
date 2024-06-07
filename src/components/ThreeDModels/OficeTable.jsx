import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath'
const OficeTable = ({  imgArray, geos }) => {
    const { nodes, materials } = useGLTF('assets/office_table.glb');
    const textures = {
        TopCusCloth: null,
        BtmCusCloth: null
    };

    const colors = {
        TopCussion: null,
        BtmCussion: null
    };
    const setTextureProperties = (type, index) => {
        const texture = useTexture(imgArray[index].image);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(geos[index].repeate, geos[index].repeate);
        texture.flipY = false;
        return texture;
    };

    if (imgArray) {
        imgArray.forEach((img, index) => {
            if (img.image) {
                if (img.type === 'TopCussion') {
                    textures.TopCusCloth = setTextureProperties('TopCussion', index);
                } else if (img.type === 'BtmCussion') {
                    textures.BtmCusCloth = setTextureProperties('BtmCussion', index);
                }
            }
        });
    }

    if (geos) {
        geos.forEach((geo) => {
            if (geo.color) {
                if (geo.name === 'TopCussion') {
                    colors.TopCussion = geo.color;
                } else if (geo.name === 'BtmCussion') {
                    colors.BtmCussion = geo.color;
                }
            }
        });
    }

    const renderMaterial = (type, baseMaterial, color, texture) => {
        
            if (color) {
                
                return (
                    <meshStandardMaterial
                        color={color}
                        roughness={baseMaterial.roughness}
                        metalness={baseMaterial.metalness}
                        normalMap={baseMaterial.normalMap}
                        aoMap={baseMaterial.aoMap}
                        emissive={baseMaterial.emissive}
                        opacity={1.0}
                        depthTest={true}
                        depthWrite={true}
                    />
                );
            } else if (texture) {
                return (
                    <meshStandardMaterial
                        map={texture}
                        transparent
                        roughness={baseMaterial.roughness}
                        metalness={baseMaterial.metalness}
                        normalMap={baseMaterial.normalMap}
                        aoMap={baseMaterial.aoMap}
                        emissive={baseMaterial.emissive}
                        opacity={1.0}
                        depthTest={true}
                        depthWrite={true}
                    />
                );
            }
       
        return null;
    };

    return (
        <group
            scale={[50, 50, 50]}
        >
            <mesh
                castShadow
                geometry={nodes.Top.geometry}
                material={materials.TopMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                scale={[0.1, 0.1, 0.1]}
            />
            <mesh
                castShadow
                geometry={nodes.Frame.geometry}
                material={materials.FrameMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                scale={[0.1, 0.1, 0.1]}
            />
            <mesh
                castShadow
                geometry={nodes.Chair.geometry}
                material={materials.ChairMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0.105, -0.045, 0]}
                scale={[0.1, 0.1, 0.1]}
            />
            <mesh
                
                castShadow
                geometry={nodes.TopCus.geometry}
                material={materials.TopCusMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0.105, -0.045, 0]}
                scale={[0.1, 0.1, 0.1]}
            >
                
                {renderMaterial('TopCussion', materials.TopCusMaterial, colors.TopCussion, null)}

            </mesh>
            <mesh
                transparent
                castShadow
                geometry={nodes.TopCusCloth.geometry}
                material={materials.TopCusClothMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0.105, -0.045, 0]}
                scale={[0.1, 0.1, 0.1]}
            >
                {renderMaterial('TopCussion', materials.TopCusClothMaterial, null, textures.TopCusCloth)}
            </mesh>
            <mesh
                castShadow
                geometry={nodes.BtmCus.geometry}
                material={materials.BtmCusMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0.105, -0.045, 0]}
                scale={[0.1, 0.1, 0.1]}
            >
                {renderMaterial('BtmCussion', materials.BtmCusMaterial, colors.BtmCussion, null)}
            </mesh>

            <mesh
                transparent
                castShadow
                geometry={nodes.BtmCusCloth.geometry}
                material={materials.BtmCusClothMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0.105, -0.045, 0]}
                scale={[0.1, 0.1, 0.1]}
            >
                {renderMaterial('BtmCussion', materials.BtmCusClothMaterial, null, textures.BtmCusCloth)}
            </mesh>
        </group>
    );
};

export default OficeTable;