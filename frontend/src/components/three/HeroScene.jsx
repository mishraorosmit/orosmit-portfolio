import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '@/store/useStore';

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function StylizedHead() {
  const groupRef = useRef();
  const pointLightRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const { viewport, pointer, camera } = useThree();
  const vec = new THREE.Vector3();
  const mouse3D = useRef(new THREE.Vector3());
  
  const [hovered, setHovered] = useState(false);
  const pupilScale = useRef(1.0);
  const setCursorVariant = useStore(state => state.setCursorVariant);

  useFrame((state, delta) => {
    // 3D Pointer Translation
    vec.set(pointer.x, pointer.y, 0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    const distance = -camera.position.z / vec.z;
    mouse3D.current.copy(camera.position).add(vec.multiplyScalar(distance));
    
    // Light Follow Logic
    if (pointLightRef.current) {
      pointLightRef.current.position.lerp(mouse3D.current, 0.1);
    }

    // Head Follow Logic
    if (groupRef.current) {
      const targetRotationX = -pointer.y * 0.5;
      const targetRotationY = pointer.x * 0.5;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }

    // Dilation Spring Logic 1.0 -> 1.3
    const targetScale = hovered ? 1.3 : 1.0;
    pupilScale.current = THREE.MathUtils.lerp(pupilScale.current, targetScale, 0.1);
    if (leftPupilRef.current && rightPupilRef.current) {
      leftPupilRef.current.scale.set(pupilScale.current, pupilScale.current, pupilScale.current);
      rightPupilRef.current.scale.set(pupilScale.current, pupilScale.current, pupilScale.current);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setCursorVariant('crosshair');
  };

  const handlePointerOut = () => {
    setHovered(false);
    setCursorVariant('default');
  };

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <pointLight ref={pointLightRef} color="#FF4500" intensity={2} distance={10} decay={2} />
      
      {/* 
        LAYER 2: Real face ready geometry.
        To use a real face, inject via useGLTF:
        const { nodes, materials } = useGLTF('/models/orosmit-face.glb');
        <mesh
          geometry={nodes.Face.geometry}
          material={materials.Chrome}
          morphTargetDictionary={nodes.Face.morphTargetDictionary}
          morphTargetInfluences={nodes.Face.morphTargetInfluences}
        />
      */}

      {/* LAYER 1: Placeholder Head Base */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial 
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.05}
          reflectivity={1}
          transmission={0.1}
          iridescence={0.8}
          iridescenceIOR={1.5}
          clearcoat={0.5}
        />
      </mesh>

      {/* Pupils */}
      <mesh ref={leftPupilRef} position={[-0.5, 0.2, 1.4]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>
      
      <mesh ref={rightPupilRef} position={[0.5, 0.2, 1.4]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full transition-colors duration-500" style={{ background: 'var(--canvas-bg)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} color="#4A5A8A" />
        <rectAreaLight 
          width={10} 
          height={10} 
          color="#4A5A8A" 
          intensity={2} 
          position={[0, 5, -2]} 
          lookAt={[0, 0, 0]} 
        />
        <ParticleField />
        <StylizedHead />
      </Canvas>
    </div>
  );
}
