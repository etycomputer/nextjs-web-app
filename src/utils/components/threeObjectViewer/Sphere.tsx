import * as THREE from 'three'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react';


export const Sphere = (props: ThreeElements['mesh']) => {

    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => (mesh.current.rotation.x += delta))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={0.5}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <sphereBufferGeometry args={[1, 64, 64]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}
