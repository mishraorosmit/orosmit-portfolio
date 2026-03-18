import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '@/store/useStore';

function OrbitalSystem() {
  const groupRef = useRef();
  const hoveredSkill = useStore(state => state.hoveredSkill);

  useFrame((state) => {
    // Slow continuous orbit for the entire system
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
      groupRef.current.rotation.x = Math.PI / 8; // slight tilt
    }
  });

  const spheres = useMemo(() => {
    return new Array(6).fill(null).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 6;
      const radius = 2.5; // Orbit radius
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: 0,
        z: Math.sin(angle) * radius,
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central Dim Star */}
      <Sphere args={[0.6, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1a1a24"
          emissive="#11111a"
          distort={0.2}
          speed={1}
          roughness={0.8}
        />
      </Sphere>

      {/* Orbiting Skill Nodes */}
      {spheres.map((s, i) => (
        <SkillNode 
          key={s.id} 
          position={[s.x, s.y, s.z]} 
          isHovered={hoveredSkill === i} 
          index={i}
        />
      ))}
    </group>
  );
}

function SkillNode({ position, isHovered, index }) {
  const nodeRef = useRef();
  
  // Spring to target color
  const currentColor = useRef(new THREE.Color('#4A5A8A'));
  const targetColor = useMemo(() => new THREE.Color(isHovered ? '#FF4500' : '#4A5A8A'), [isHovered]);

  useFrame(() => {
    // Lerp color
    currentColor.current.lerp(targetColor, 0.1);
    if (nodeRef.current) {
      nodeRef.current.material.color.copy(currentColor.current);
      nodeRef.current.material.emissive.copy(currentColor.current);
      nodeRef.current.material.emissiveIntensity = isHovered ? 2.5 : 0.5;
      
      // Auto-spin node itself
      nodeRef.current.rotation.x += 0.01;
      nodeRef.current.rotation.y += 0.02;
      
      // Scale slightly when hovered
      const targetScale = isHovered ? 1.6 : 1.0;
      nodeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Sphere ref={nodeRef} args={[0.2, 16, 16]} position={position}>
      <meshStandardMaterial
        color={currentColor.current}
        emissive={currentColor.current}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={!isHovered}
      />
    </Sphere>
  );
}

export default function SkillsOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      {/* Lights */}
      <ambientLight intensity={0.5} color="#2A3A6A" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#FF4500" distance={5} />
      
      <OrbitalSystem />
    </Canvas>
  );
}
