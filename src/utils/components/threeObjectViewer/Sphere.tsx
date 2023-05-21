import { setMarker } from '@/redux/features/markerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ThreeElements } from '@react-three/fiber';
import { useState } from 'react';


interface SphereProps {
	marker: any;
}

export const Sphere = ({ marker }: SphereProps) => {

	const dispatch = useAppDispatch();
	const selectedMarker = useAppSelector((state) => state.markerReducer.marker);
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);

	const markerClickHandler = () => {
		setActive(!active);
		dispatch(setMarker(marker));
	}

	return (
		<mesh
			scale={0.5}
			position={[marker.x, marker.y, marker.z]}
			onClick={markerClickHandler}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<sphereBufferGeometry args={[1, 64, 64]} />
			<meshStandardMaterial color={hovered || selectedMarker?.positionId === marker.positionId ? 'hotpink' : 'orange'} />
		</mesh>
	);
};
