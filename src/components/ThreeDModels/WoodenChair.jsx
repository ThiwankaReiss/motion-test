import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const WoodenChair = ({  imgArray, geos }) => {
    const { nodes, materials } = useGLTF('assets/woodChair.glb');
    const textures = {
        Cussion: null
    };

    const colors = {
        Cussion: null
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
                if (img.type === 'Cussion') {
                    textures.Cussion = setTextureProperties('Cussion', index);
                }
            }
        });
    }
    if (geos) {
        geos.forEach((geo) => {
            if (geo.color) {
                if (geo.name === 'Cussion') {
                    colors.Cussion = geo.color;
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
        <group>
            <mesh
                castShadow
                geometry={nodes.frame.geometry}
                material={materials.FrameMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                scale={[0.2, 0.2, 0.2]}
            />
            {nodes.cussion.children.map((child, index) => (
                <mesh
                    key={index}
                    castShadow
                    geometry={child.geometry}
                    material={materials.CussionMaterial}
                    material-roughness={1}
                    dispose={null}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                    scale={[0.2, 0.2, 0.2]}
                >
                    {renderMaterial('Cussion', materials.CussionMaterial, colors.Cussion, null)}
                </mesh>
            ))}
            {nodes.cussionCloth.children.map((child, index) => (
                <mesh
                    key={index}
                    castShadow
                    geometry={child.geometry}
                    material={materials.CussionClothMaterial}
                    material-roughness={1}
                    dispose={null}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                    scale={[0.2, 0.2, 0.2]}
                >
                    {renderMaterial('Cussion', materials.CussionClothMaterial, null, textures.Cussion)}
                </mesh>
            ))}
        </group>
    );
};

export default WoodenChair;
