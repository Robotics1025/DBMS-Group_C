"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Center,
  ContactShadows,
} from "@react-three/drei";

function BikeModel() {
  const { scene } = useGLTF("/models/bike.glb");

  return (
    <Center>
      <primitive
        object={scene}
        rotation={[Math.PI / 1, 0, 0]} // ✅ Fix upside-down
        castShadow
      />
    </Center>
  );
}

export default function BikeScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 450], fov: 30 }} // Adjusted camera position and FOV
      >
        {/* Lights with shadows */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Bike */}
        <BikeModel />

        {/* Soft shadow under bike */}
        <ContactShadows
          position={[0, -1, 0]} // y = ground level
          opacity={0.6}
          scale={1}
          blur={2}
          far={4}
        />

        {/* Controls */}
        <OrbitControls enableZoom autoRotate 
         minDistance={200} // adjusted for big camera
    maxDistance={1500} // adjusted for big camera
        autoRotateSpeed={1.2} />

        {/* Background environment */}
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
