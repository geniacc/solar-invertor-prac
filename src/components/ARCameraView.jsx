import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import OptimizedInverterModel from './OptimizedInverterModel';
import './ARCameraView.css';

// AR Scene Component
const ARScene = ({ 
  inverterPosition, 
  inverterRotation, 
  inverterScale, 
  onInverterMove, 
  detailLevel = 'medium',
  autoRotate = false,
  showGroundPlane = true 
}) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    // Set up camera for AR with better positioning
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 0, 0);
    
    // Enable shadows for better realism
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [camera, gl]);

  return (
    <>
      {/* Enhanced Lighting for AR */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
      
      {/* Optimized Inverter Model */}
      <OptimizedInverterModel
        position={inverterPosition}
        rotation={inverterRotation}
        scale={inverterScale}
        onPositionChange={onInverterMove}
        detailLevel={detailLevel}
        autoRotate={autoRotate}
        interactive={true}
      />
      
      {/* Enhanced Ground Plane with shadow receiving */}
      {showGroundPlane && (
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -2, 0]} 
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#f5f5f5" 
            transparent 
            opacity={0.2}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      )}
      
      {/* Grid Helper for better spatial reference */}
      <gridHelper 
        args={[10, 10, '#cccccc', '#eeeeee']} 
        position={[0, -1.99, 0]}
        material-transparent
        material-opacity={0.3}
      />
      
      {/* Enhanced Controls */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={2}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

const ARCameraView = ({ isVisible, onClose, product }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inverterPosition, setInverterPosition] = useState([0, 0, 0]);
  const [inverterRotation, setInverterRotation] = useState([0, 0, 0]);
  const [inverterScale, setInverterScale] = useState([1, 1, 1]);
  const [showControls, setShowControls] = useState(true);
  const [detailLevel, setDetailLevel] = useState('medium');
  const [autoRotate, setAutoRotate] = useState(false);
  const [showGroundPlane, setShowGroundPlane] = useState(true);

  // Initialize camera
  useEffect(() => {
    if (isVisible) {
      initializeCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const initializeCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setCameraStream(stream);
      setIsLoading(false);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handlePositionChange = (axis, value) => {
    setInverterPosition(prev => {
      const newPos = [...prev];
      newPos[axis] = value;
      return newPos;
    });
  };

  const handleRotationChange = (axis, value) => {
    setInverterRotation(prev => {
      const newRot = [...prev];
      newRot[axis] = value;
      return newRot;
    });
  };

  const handleScaleChange = (value) => {
    setInverterScale([value, value, value]);
  };

  const resetPosition = () => {
    setInverterPosition([0, 0, 0]);
    setInverterRotation([0, 0, 0]);
    setInverterScale([1, 1, 1]);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="ar-camera-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Camera Video Background */}
        <video
          ref={videoRef}
          className="ar-camera-video"
          autoPlay
          playsInline
          muted
        />

        {/* AR Canvas Overlay */}
        <div className="ar-canvas-container">
          <Canvas
            ref={canvasRef}
            camera={{ fov: 75, near: 0.1, far: 1000 }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <ARScene
                inverterPosition={inverterPosition}
                inverterRotation={inverterRotation}
                inverterScale={inverterScale}
                onInverterMove={setInverterPosition}
                detailLevel={detailLevel}
                autoRotate={autoRotate}
                showGroundPlane={showGroundPlane}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="ar-loading">
            <div className="ar-loading-spinner"></div>
            <p>Initializing AR Camera...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="ar-error">
            <p>{error}</p>
            <button onClick={initializeCamera} className="ar-retry-btn">
              Retry
            </button>
          </div>
        )}

        {/* AR Controls */}
        <AnimatePresence>
          {showControls && !isLoading && !error && (
            <motion.div
              className="ar-controls"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ar-controls-header">
                <h3>AR Controls</h3>
                <button
                  className="ar-controls-toggle"
                  onClick={() => setShowControls(false)}
                >
                  ×
                </button>
              </div>

              {/* Performance & Visual Controls */}
              <div className="ar-control-section">
                <h4>Performance & Visual</h4>
                
                <div className="ar-control-group">
                  <label>Detail Level:</label>
                  <select 
                    value={detailLevel} 
                    onChange={(e) => setDetailLevel(e.target.value)}
                    className="ar-select"
                  >
                    <option value="low">Low (Better Performance)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (Best Quality)</option>
                  </select>
                </div>

                <div className="ar-control-group">
                  <label>Auto Rotation:</label>
                  <button
                    className={`ar-toggle-btn ${autoRotate ? 'active' : ''}`}
                    onClick={() => setAutoRotate(!autoRotate)}
                  >
                    {autoRotate ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="ar-control-group">
                  <label>Ground Plane:</label>
                  <button
                    className={`ar-toggle-btn ${showGroundPlane ? 'active' : ''}`}
                    onClick={() => setShowGroundPlane(!showGroundPlane)}
                  >
                    {showGroundPlane ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Position Controls */}
              <div className="ar-control-section">
                <h4>Position & Orientation</h4>
                
                <div className="ar-control-group">
                  <label>Position X:</label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={inverterPosition[0]}
                  onChange={(e) => handlePositionChange(0, parseFloat(e.target.value))}
                />
                <span>{inverterPosition[0].toFixed(1)}</span>
              </div>

              <div className="ar-control-group">
                <label>Position Y:</label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={inverterPosition[1]}
                  onChange={(e) => handlePositionChange(1, parseFloat(e.target.value))}
                />
                <span>{inverterPosition[1].toFixed(1)}</span>
              </div>

              <div className="ar-control-group">
                <label>Position Z:</label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={inverterPosition[2]}
                  onChange={(e) => handlePositionChange(2, parseFloat(e.target.value))}
                />
                <span>{inverterPosition[2].toFixed(1)}</span>
              </div>

              <div className="ar-control-group">
                <label>Rotation Y:</label>
                <input
                  type="range"
                  min="0"
                  max={Math.PI * 2}
                  step="0.1"
                  value={inverterRotation[1]}
                  onChange={(e) => handleRotationChange(1, parseFloat(e.target.value))}
                />
                <span>{(inverterRotation[1] * 180 / Math.PI).toFixed(0)}°</span>
              </div>

              <div className="ar-control-group">
                <label>Scale:</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={inverterScale[0]}
                  onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                />
                <span>{inverterScale[0].toFixed(1)}x</span>
              </div>

                <button className="ar-reset-btn" onClick={resetPosition}>
                  Reset Position
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Controls Button */}
        {!showControls && !isLoading && !error && (
          <button
            className="ar-show-controls-btn"
            onClick={() => setShowControls(true)}
          >
            ⚙️
          </button>
        )}

        {/* Close Button */}
        <button className="ar-close-btn" onClick={onClose}>
          ×
        </button>

        {/* Instructions */}
        {!isLoading && !error && (
          <div className="ar-instructions">
            <p>📱 Point your camera at a wall or surface</p>
            <p>🔧 Use controls to position the UPS</p>
            <p>👆 Tap and drag to rotate the view</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ARCameraView;