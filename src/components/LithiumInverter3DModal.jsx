import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { X, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import OptimizedInverterModel from './OptimizedInverterModel';
import './LithiumInverter3DModal.css';



// Main Modal Component
const LithiumInverter3DModal = ({ isOpen, onClose }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setAutoRotate(true);
  };

  return (
    <div className="lithium-modal-overlay">
      <div className="lithium-modal-content-3d">
        {/* Header */}
        <div className="lithium-modal-header-3d">
          <div className="lithium-modal-title-section">
            <div className="lithium-product-icon-3d">
              ⚡
            </div>
            <div>
              <h2 className="lithium-modal-title">Zuice Lithium Inverter</h2>
            <p className="lithium-modal-subtitle">Interactive 3D model of Zuice premium lithium inverter</p>
            </div>
          </div>
          <button className="lithium-close-btn-3d" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* 3D Canvas */}
        <div className="lithium-canvas-container">
          <Canvas
            camera={{ position: [5, 3, 5], fov: 50 }}
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            <pointLight position={[0, 0, 10]} intensity={0.5} />
            
            <OptimizedInverterModel 
              autoRotate={autoRotate} 
              detailLevel="high"
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[1, 1, 1]}
            />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
              minDistance={3}
              maxDistance={15}
            />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="lithium-controls-section">
          <div className="lithium-controls-grid">
            <div className="lithium-control-group">
              <label className="lithium-control-label">Rotation</label>
              <button
                className={`lithium-control-button ${autoRotate ? 'active' : ''}`}
                onClick={() => setAutoRotate(!autoRotate)}
              >
                <RotateCcw size={16} />
                {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
              </button>
            </div>
            
            <div className="lithium-control-group">
              <label className="lithium-control-label">Zoom</label>
              <button className="lithium-control-button" onClick={handleZoomIn}>
                <ZoomIn size={16} />
                Zoom In
              </button>
            </div>
            
            <div className="lithium-control-group">
              <label className="lithium-control-label">Zoom</label>
              <button className="lithium-control-button" onClick={handleZoomOut}>
                <ZoomOut size={16} />
                Zoom Out
              </button>
            </div>
            
            <div className="lithium-control-group">
              <label className="lithium-control-label">View</label>
              <button className="lithium-control-button" onClick={handleResetView}>
                <RotateCcw size={16} />
                Reset View
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="lithium-product-info">
            <div className="lithium-info-item">
              <div className="lithium-info-value">Zuice-5K</div>
              <div className="lithium-info-label">Model</div>
            </div>
            <div className="lithium-info-item">
              <div className="lithium-info-value">5kW</div>
              <div className="lithium-info-label">Power Output</div>
            </div>
            <div className="lithium-info-item">
              <div className="lithium-info-value">48V</div>
              <div className="lithium-info-label">Battery Voltage</div>
            </div>
            <div className="lithium-info-item">
              <div className="lithium-info-value">MPPT</div>
              <div className="lithium-info-label">Charge Controller</div>
            </div>
            <div className="lithium-info-item">
              <div className="lithium-info-value">LCD</div>
              <div className="lithium-info-label">Display Type</div>
            </div>
            <div className="lithium-info-item">
              <div className="lithium-info-value">IP65</div>
              <div className="lithium-info-label">Protection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LithiumInverter3DModal;