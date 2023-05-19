import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'
import { Sphere } from './Sphere';

const ReactThreeObjectViewer = ({ object }: any) => {
    return (
        <Canvas camera={{ position: [0, 1, 35], fov: 90 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Grid infiniteGrid />
            <Sphere position={[object.x, object.y, object.z]} />
            <OrbitControls />
        </Canvas>
    );
};

export default ReactThreeObjectViewer;

