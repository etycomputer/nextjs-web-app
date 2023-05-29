import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import { Sphere } from './Sphere';
import MarkerTooltip from '../markerViewer/MarkerTooltip';
import { useState } from 'react';

interface ReactThreeObjectViewerProps {
  markersList: any[];
}

const ReactThreeObjectViewer = ({
  markersList,
}: ReactThreeObjectViewerProps) => {
  const [hoveredMarker, setHoveredMarker] = useState<any | undefined>(
    undefined
  );

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
            onHover={(marker) => setHoveredMarker(marker)}
          />
        ))}
      </Canvas>
      <MarkerTooltip marker={hoveredMarker} />
    </>
  );
};

export default ReactThreeObjectViewer;
