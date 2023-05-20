import { ThreeElements } from '@react-three/fiber';
import { useState } from 'react';

export const Sphere = (props: ThreeElements['mesh']) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      scale={0.5}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereBufferGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};
