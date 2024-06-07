import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const PicnicTable = ({ imgArray, geos}) => {
    const { nodes, materials } = useGLTF('assets/PicnicWoodTable.glb');

    const textures = {
        Table: null
    };

    const colors = {
        Table: null
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
                if (img.type === 'Table') {
                    textures.Table = setTextureProperties('Table', index);
                } 
            }
        });
    }

    if (geos) {
        geos.forEach((geo) => {
            if (geo.color) {
                if (geo.name === 'Table') {
                    colors.Table = geo.color;
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
            scale={[30, 30, 30]}
        >

            <mesh
                castShadow
                geometry={nodes.Table.geometry}
                material={materials.TableMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[0.001, 0.001, 0.001]}
            >
                {renderMaterial('Table', materials.TableMaterial, colors.Table, null)}
            </mesh>
            <mesh
                castShadow
                geometry={nodes.TableCloth.geometry}
                material={materials.TableClothMaterial}
                material-roughness={1}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[0.001, 0.001, 0.001]}
            >
                {renderMaterial('Table', materials.TableClothMaterial, null, textures.Table)}
            </mesh>

        </group>
    );
};

export default PicnicTable;