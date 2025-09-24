import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'antd';
// Import A-Frame and AR.js A-Frame build
import 'aframe';
import 'ar.js/aframe/build/aframe-ar.min.js';

const ARProductPlacement = () => {
  const [visible, setVisible] = React.useState(false);
  const arSceneRef = useRef(null);

  useEffect(() => {
    if (visible) {
      // Optional: any setup needed when AR modal opens
    }
  }, [visible]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      margin: '60px 0',
      padding: '0 2rem'
    }}>
      <Button 
        type="primary" 
        onClick={() => setVisible(true)}
        size="large"
        style={{
          background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
          border: '1px solid rgba(6, 182, 212, 0.5)',
          borderRadius: '12px',
          padding: '12px 32px',
          fontSize: '16px',
          fontWeight: '600',
          height: 'auto',
          boxShadow: '0 8px 25px rgba(6, 182, 212, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 12px 35px rgba(6, 182, 212, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.3)';
        }}
      >
        🥽 View Product in AR
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width="100%"
        style={{ 
          top: 0, 
          padding: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)'
        }}
        bodyStyle={{ 
          padding: 0, 
          margin: 0, 
          height: '100vh',
          background: 'linear-gradient(135deg, #0c101b, #1a1a2e)'
        }}
        destroyOnClose
        centered
      >
        <a-scene
          ref={arSceneRef}
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
          style={{ height: '100vh', width: '100vw' }}
        >
          <a-marker preset="hiro">
            <a-gltf-model
              src="/models/product1.glb"
              position="0 0 0"
              scale="0.5 0.5 0.5"
              rotation="0 180 0"
            />
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </Modal>
    </div>
  );
};

export default ARProductPlacement;
