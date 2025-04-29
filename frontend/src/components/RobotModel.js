import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function RobotModel({ isListening, isSpeaking }) {
  const robotRef = useRef();
  
  // For now, we'll use a simple geometric shape as a placeholder
  // Later, you can replace this with a proper GLTF model
  useFrame((state) => {
    if (robotRef.current) {
      // Add some idle animation
      robotRef.current.rotation.y += 0.01;
      
      // Add speaking/listening animations
      if (isListening) {
        robotRef.current.scale.x = Math.sin(state.clock.elapsedTime * 8) * 0.05 + 1;
      }
      if (isSpeaking) {
        robotRef.current.scale.y = Math.sin(state.clock.elapsedTime * 12) * 0.05 + 1;
      }
    }
  });

  return (
    <group ref={robotRef}>
      {/* Robot Head */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={isListening ? "#ff4444" : "#4444ff"} />
      </mesh>
      
      {/* Robot Body */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      
      {/* Robot Eyes */}
      <mesh position={[-0.2, 1.2, 0.51]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color={isSpeaking ? "#44ff44" : "#ffffff"} />
      </mesh>
      <mesh position={[0.2, 1.2, 0.51]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color={isSpeaking ? "#44ff44" : "#ffffff"} />
      </mesh>
      
      {/* Robot Antenna */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color={isListening || isSpeaking ? "#ff4444" : "#888888"} />
      </mesh>
    </group>
  );
}

export default RobotModel; 