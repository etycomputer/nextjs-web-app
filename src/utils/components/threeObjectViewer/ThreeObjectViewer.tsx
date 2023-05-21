import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import { Sphere } from './Sphere';

interface ReactThreeObjectViewerProps {
	markersList: any[];
}

const ReactThreeObjectViewer = ({ markersList }: ReactThreeObjectViewerProps) => {
	return (
		<>
			<Canvas camera={{ position: [0, 1, 35], fov: 90 }}>
				<pointLight position={[10, 10, 10]} />
				<ambientLight />
				<OrbitControls />
				<Grid infiniteGrid />
				{markersList.map((marker) => (
					<Sphere
						key={marker.positionId}
						marker={marker}
					/>
				))}
			</Canvas>

		</>
	);
};

export default ReactThreeObjectViewer;
