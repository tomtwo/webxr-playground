import { useEffect } from 'react';
import { VRCanvas, DefaultXRControllers, useXR } from '@react-three/xr';
import { Stats, Text } from '@react-three/drei';

import BoxVR from './BoxVR';

function PlayerPositionController() {
  const { player, isPresenting } = useXR();

  useEffect(() => {
    if (!player) {
      return;
    }

    if (isPresenting) {
      player.position.y -= 1;
      player.position.z += 5;
    } else {
      player.position.x = 0;
      player.position.y = 0;
      player.position.z = 0;
    }
  }, [player, isPresenting]);

  return null;
}

export default function CanvasVR() {
  return (
    <VRCanvas gl={{ antialias: true, alpha: true }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <DefaultXRControllers />
      <PlayerPositionController />

      <Stats />
      <Text
        text="webxr-playground"
        position={[0, 2, -9]}
        color="#000"
        fontSize={1.4}
      />

      <BoxVR position={[-1.2, 0, 0]} spinAxis="y" />
      <BoxVR position={[1.2, 0, 0]} spinAxis="x" />
    </VRCanvas>
  );
}
