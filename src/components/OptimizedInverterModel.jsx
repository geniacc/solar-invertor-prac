import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OptimizedInverterModel = ({ 
  autoRotate = false, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  onPositionChange,
  interactive = false,
  detailLevel = 'high' // 'high', 'medium', 'low'
}) => {
  const meshRef = useRef();
  const groupRef = useRef();

  // Optimize materials by memoizing them
  const materials = useMemo(() => ({
    mainBody: new THREE.MeshStandardMaterial({ 
      color: "#f0f0f0", 
      metalness: 0.1, 
      roughness: 0.3 
    }),
    darkPanel: new THREE.MeshStandardMaterial({ 
      color: "#2a2a2a", 
      metalness: 0.2, 
      roughness: 0.4 
    }),
    display: new THREE.MeshStandardMaterial({ 
      color: "#000", 
      emissive: "#003300", 
      emissiveIntensity: 0.2 
    }),
    screen: new THREE.MeshStandardMaterial({ 
      color: "#001100", 
      emissive: "#00ff00", 
      emissiveIntensity: 0.4 
    }),
    ledGreen: new THREE.MeshStandardMaterial({ 
      color: "#00ff00", 
      emissive: "#00ff00", 
      emissiveIntensity: 0.8 
    }),
    ledBlue: new THREE.MeshStandardMaterial({ 
      color: "#0066ff", 
      emissive: "#0066ff", 
      emissiveIntensity: 0.8 
    }),
    ledOrange: new THREE.MeshStandardMaterial({ 
      color: "#ffaa00", 
      emissive: "#ffaa00", 
      emissiveIntensity: 0.8 
    }),
    ledRed: new THREE.MeshStandardMaterial({ 
      color: "#ff0000", 
      emissive: "#ff0000", 
      emissiveIntensity: 0.8 
    }),
    fan: new THREE.MeshStandardMaterial({ color: "#333" }),
    fanBlade: new THREE.MeshStandardMaterial({ color: "#555" }),
    ventilation: new THREE.MeshStandardMaterial({ color: "#111" }),
    connection: new THREE.MeshStandardMaterial({ color: "#222" }),
    cable: new THREE.MeshStandardMaterial({ color: "#333" }),
    bracket: new THREE.MeshStandardMaterial({ color: "#444" }),
    brandBg: new THREE.MeshStandardMaterial({ 
      color: "#06b6d4", 
      emissive: "#06b6d4", 
      emissiveIntensity: 0.3 
    }),
    brandText: new THREE.MeshStandardMaterial({ 
      color: "#ffffff", 
      emissive: "#ffffff", 
      emissiveIntensity: 0.5 
    }),
    modelText: new THREE.MeshStandardMaterial({ 
      color: "#333", 
      emissive: "#333", 
      emissiveIntensity: 0.3 
    })
  }), []);

  // Optimize geometries by memoizing them
  const geometries = useMemo(() => ({
    mainBox: new THREE.BoxGeometry(3, 4, 1.2),
    sidePanel: new THREE.BoxGeometry(0.2, 4, 1.2),
    displayPanel: new THREE.BoxGeometry(1.8, 0.8, 0.05),
    screen: new THREE.BoxGeometry(1.6, 0.6, 0.02),
    led: new THREE.SphereGeometry(0.04),
    fan: new THREE.CylinderGeometry(0.25, 0.25, 0.1),
    fanBlade: new THREE.BoxGeometry(0.4, 0.02, 0.02),
    sideFan: new THREE.CylinderGeometry(0.2, 0.2, 0.05),
    sideFanBlade: new THREE.BoxGeometry(0.02, 0.3, 0.02),
    ventHole: new THREE.CylinderGeometry(0.02, 0.02, 0.25),
    connection: new THREE.BoxGeometry(0.6, 0.3, 0.1),
    cable: new THREE.BoxGeometry(0.3, 0.2, 0.1),
    bracket: new THREE.BoxGeometry(2.5, 0.3, 0.2),
    mountHole: new THREE.CylinderGeometry(0.05, 0.05, 0.1),
    brandLabel: new THREE.BoxGeometry(1.2, 0.3, 0.02),
    brandBg: new THREE.BoxGeometry(1.1, 0.25, 0.01),
    brandElement: new THREE.BoxGeometry(0.15, 0.08, 0.005),
    modelNumber: new THREE.BoxGeometry(0.8, 0.04, 0.005)
  }), []);

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Render different detail levels for performance optimization
  const renderDetailLevel = () => {
    switch (detailLevel) {
      case 'low':
        return renderLowDetail();
      case 'medium':
        return renderMediumDetail();
      case 'high':
      default:
        return renderHighDetail();
    }
  };

  const renderLowDetail = () => (
    <>
      {/* Main Body Only */}
      <mesh geometry={geometries.mainBox} material={materials.mainBody} />
      
      {/* Basic Display */}
      <mesh position={[0, 0.8, 0.61]} geometry={geometries.displayPanel} material={materials.display} />
      
      {/* Basic LEDs */}
      <mesh position={[-0.6, 0.4, 0.64]} geometry={geometries.led} material={materials.ledGreen} />
      <mesh position={[0.3, 0.4, 0.64]} geometry={geometries.led} material={materials.ledRed} />
    </>
  );

  const renderMediumDetail = () => (
    <>
      {/* Main Body */}
      <mesh geometry={geometries.mainBox} material={materials.mainBody} />
      
      {/* Side Panels */}
      <mesh position={[-1.6, 0, 0]} geometry={geometries.sidePanel} material={materials.darkPanel} />
      <mesh position={[1.6, 0, 0]} geometry={geometries.sidePanel} material={materials.darkPanel} />
      
      {/* Display Panel */}
      <mesh position={[0, 0.8, 0.61]} geometry={geometries.displayPanel} material={materials.display} />
      <mesh position={[0, 0.8, 0.64]} geometry={geometries.screen} material={materials.screen} />
      
      {/* Status LEDs */}
      <mesh position={[-0.6, 0.4, 0.64]} geometry={geometries.led} material={materials.ledGreen} />
      <mesh position={[-0.3, 0.4, 0.64]} geometry={geometries.led} material={materials.ledBlue} />
      <mesh position={[0, 0.4, 0.64]} geometry={geometries.led} material={materials.ledOrange} />
      <mesh position={[0.3, 0.4, 0.64]} geometry={geometries.led} material={materials.ledRed} />
      
      {/* Top Fans */}
      <mesh position={[-0.6, 2.1, 0]} geometry={geometries.fan} material={materials.fan} />
      <mesh position={[0.6, 2.1, 0]} geometry={geometries.fan} material={materials.fan} />
      
      {/* Brand Area */}
      <mesh position={[0, -0.5, 0.62]} geometry={geometries.brandBg} material={materials.brandBg} />
    </>
  );

  const renderHighDetail = () => (
    <>
      {/* Main Body */}
      <mesh geometry={geometries.mainBox} material={materials.mainBody} />
      
      {/* Side Panels */}
      <mesh position={[-1.6, 0, 0]} geometry={geometries.sidePanel} material={materials.darkPanel} />
      <mesh position={[1.6, 0, 0]} geometry={geometries.sidePanel} material={materials.darkPanel} />
      
      {/* Display Panel */}
      <mesh position={[0, 0.8, 0.61]} geometry={geometries.displayPanel} material={materials.display} />
      <mesh position={[0, 0.8, 0.64]} geometry={geometries.screen} material={materials.screen} />
      
      {/* Status LEDs */}
      <mesh position={[-0.6, 0.4, 0.64]} geometry={geometries.led} material={materials.ledGreen} />
      <mesh position={[-0.3, 0.4, 0.64]} geometry={geometries.led} material={materials.ledBlue} />
      <mesh position={[0, 0.4, 0.64]} geometry={geometries.led} material={materials.ledOrange} />
      <mesh position={[0.3, 0.4, 0.64]} geometry={geometries.led} material={materials.ledRed} />
      
      {/* Top Cooling Fans */}
      <mesh position={[-0.6, 2.1, 0]} geometry={geometries.fan} material={materials.fan} />
      <mesh position={[0.6, 2.1, 0]} geometry={geometries.fan} material={materials.fan} />
      
      {/* Fan Blades */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[-0.6, 2.15, 0]} rotation={[0, (i * Math.PI) / 3, 0]} geometry={geometries.fanBlade} material={materials.fanBlade} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i + 6} position={[0.6, 2.15, 0]} rotation={[0, (i * Math.PI) / 3, 0]} geometry={geometries.fanBlade} material={materials.fanBlade} />
      ))}
      
      {/* Side Ventilation - Optimized */}
      {Array.from({ length: 20 }, (_, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        return (
          <mesh key={i} position={[-1.65, -0.5 + row * 0.3, -0.3 + col * 0.15]} geometry={geometries.ventHole} material={materials.ventilation} />
        );
      })}
      {Array.from({ length: 20 }, (_, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        return (
          <mesh key={i + 20} position={[1.65, -0.5 + row * 0.3, -0.3 + col * 0.15]} geometry={geometries.ventHole} material={materials.ventilation} />
        );
      })}
      
      {/* Connection Ports */}
      <mesh position={[0, -1.2, 0.61]} geometry={geometries.connection} material={materials.connection} />
      
      {/* Cable Entry Points */}
      <mesh position={[-0.8, -1.5, 0.61]} geometry={geometries.cable} material={materials.cable} />
      <mesh position={[0.8, -1.5, 0.61]} geometry={geometries.cable} material={materials.cable} />
      
      {/* Mounting Brackets */}
      <mesh position={[0, 1.5, -0.7]} geometry={geometries.bracket} material={materials.bracket} />
      <mesh position={[0, 0, -0.7]} geometry={geometries.bracket} material={materials.bracket} />
      <mesh position={[0, -1.5, -0.7]} geometry={geometries.bracket} material={materials.bracket} />
      
      {/* Brand Label Area */}
      <mesh position={[0, -0.5, 0.61]} geometry={geometries.brandLabel} material={materials.brandText} />
      <mesh position={[0, -0.5, 0.62]} geometry={geometries.brandBg} material={materials.brandBg} />
      
      {/* Zuice Text Elements */}
      <mesh position={[-0.3, -0.5, 0.63]} geometry={geometries.brandElement} material={materials.brandText} />
      <mesh position={[-0.1, -0.5, 0.63]} geometry={geometries.brandElement} material={materials.brandText} />
      <mesh position={[0.1, -0.5, 0.63]} geometry={geometries.brandElement} material={materials.brandText} />
      <mesh position={[0.25, -0.5, 0.63]} geometry={geometries.brandElement} material={materials.brandText} />
      <mesh position={[0.4, -0.5, 0.63]} geometry={geometries.brandElement} material={materials.brandText} />
      
      {/* Model Number */}
      <mesh position={[0, -0.65, 0.63]} geometry={geometries.modelNumber} material={materials.modelText} />
      
      {/* Side Cooling Fans */}
      <mesh position={[1.65, 0.5, 0]} geometry={geometries.sideFan} material={materials.fan} />
      <mesh position={[1.65, -0.5, 0]} geometry={geometries.sideFan} material={materials.fan} />
      
      {/* Side Fan Blades */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[1.67, 0.5, 0]} rotation={[0, 0, (i * Math.PI) / 2.5]} geometry={geometries.sideFanBlade} material={materials.fanBlade} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i + 5} position={[1.67, -0.5, 0]} rotation={[0, 0, (i * Math.PI) / 2.5]} geometry={geometries.sideFanBlade} material={materials.fanBlade} />
      ))}
    </>
  );

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group ref={meshRef}>
        {renderDetailLevel()}
      </group>
    </group>
  );
};

export default OptimizedInverterModel;