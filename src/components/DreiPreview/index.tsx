import * as THREE from 'three';
import React from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Reflector, CameraShake, OrbitControls, useTexture, Text } from '@react-three/drei';
import { KernelSize } from 'postprocessing';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import dynamic from 'next/dynamic';

const VideoText = dynamic(() => import('./VideoText'), { ssr: false });

const Rig = ({ children }) => {
  const ref = React.useRef<any>(null);
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (-mouse.x * Math.PI) / 20,
      0.1
    );
  });
  return <group ref={ref}>{children}</group>;
};

const Ground = (props) => {
  const [floor, normal] = useTexture([
    '/SurfaceImperfections003_1K_var1.jpg',
    '/SurfaceImperfections003_1K_Normal.jpg',
  ]);
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, materialProps) => (
        <Material
          color="#f0f0f0"
          metalness={0}
          roughnessMap={floor}
          normalMap={normal}
          {...materialProps}
        />
      )}
    </Reflector>
  );
};

const DreiPreview = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [fontSizePreview, setFontSizePreview] = React.useState(2);

  React.useEffect(() => {
    new ResizeObserver(() => {
      const canvasComponent = canvasRef.current;
      const canvasWidth = canvasComponent?.getClientRects().item(0).width;
      if (canvasWidth < 600) {
        setFontSizePreview(0.5);
      } else {
        setFontSizePreview(2);
      }
    }).observe(canvasRef.current);
  }, []);

  return (
    <Canvas ref={canvasRef} dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
      <color attach="background" args={['black']} />
      <ambientLight />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <React.Suspense fallback={null}>
        <Rig>
          <Text fontSize={fontSizePreview} letterSpacing={-0.06} color="white">
            Vorseek
            <VideoText />
          </Text>
          <Ground
            mirror={1}
            blur={[500, 100]}
            mixBlur={12}
            mixStrength={1.5}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            position-y={-0.8}
          />
        </Rig>

        <EffectComposer multisampling={8}>
          <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.6} />
          <Bloom
            kernelSize={KernelSize.HUGE}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={0.5}
          />
        </EffectComposer>
      </React.Suspense>
      <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
    </Canvas>
  );
};

export default DreiPreview;
