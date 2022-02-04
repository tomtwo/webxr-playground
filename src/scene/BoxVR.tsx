import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Interactive } from '@react-three/xr';
import { Mesh } from 'three';

export default function BoxVR({ spinAxis, ...props }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref.current) {
      if (spinAxis === 'x') {
        ref.current.rotation.x += 0.01;
      } else if (spinAxis === 'y') {
        ref.current.rotation.y += 0.01;
      } else if (spinAxis === 'z') {
        ref.current.rotation.z += 0.01;
      }
    }
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <Interactive
      onHover={() => {
        console.log('onHover');
        hover(true);
      }}
      onBlur={() => {
        console.log('onBlur');
        hover(false);
        click(false);
      }}
      onSelectStart={() => {
        console.log('onSelectStart');
        click(true);
      }}
      onSelectEnd={() => {
        console.log('onSelectEnd');
        click(false);
      }}
    >
      <mesh {...props} ref={ref} scale={clicked ? 1.5 : 1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    </Interactive>
  );
}
