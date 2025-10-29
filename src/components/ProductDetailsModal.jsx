import React from 'react';
import { Modal, Button, Tag } from 'antd';
import { ThunderboltOutlined, SettingOutlined, SafetyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './ProductDetailsModal.css';

const ProductDetailsModal = ({ visible, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      className="product-details-modal"
      destroyOnClose={true}
      centered
    >
      <motion.div 
        className="product-modal-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          staggerChildren: 0.1
        }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="product-category">
            {product.category || 'Solar Equipment'}
          </div>
          <h2 className="product-title">
            {product.title || product.name}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Product Image */}
          <motion.div 
            className="product-image-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={product.image || product.images?.[0]} 
              alt={product.title || product.name}
              className="product-image"
            />
          </motion.div>

          {/* Product Information */}
          <motion.div 
            className="product-info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Key Specifications */}
            <div className="specifications-section">
              <h3 className="section-title">Key Specifications</h3>
              <div className="specifications-grid">
                <motion.div 
                  className="spec-item"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ThunderboltOutlined className="spec-icon power" />
                  <div className="spec-content">
                    <div className="spec-value">{product.powerOutput || product.power || '5000W'}</div>
                    <div className="spec-label">Power Output</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="spec-item"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SettingOutlined className="spec-icon efficiency" />
                  <div className="spec-content">
                    <div className="spec-value">{product.efficiency || '98%'}</div>
                    <div className="spec-label">Efficiency</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="spec-item"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SafetyOutlined className="spec-icon warranty" />
                  <div className="spec-content">
                    <div className="spec-value">{product.warranty || '10 Years'}</div>
                    <div className="spec-label">Warranty</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Product Description */}
            <motion.div 
              className="description-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="section-title">Description</h3>
              <p className="description-text">
                {product.desc || product.description || 'This advanced solar inverter offers industry-leading efficiency and reliability. Designed for both residential and commercial applications, it features smart monitoring capabilities and robust protection systems.'}
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div 
              className="features-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="section-title">Key Features</h3>
              <div className="features-list">
                {(product.tags || product.features || ['Smart Monitoring', 'High Efficiency', 'Compact Design']).slice(0, 6).map((feature, index) => (
                  <Tag key={index} color="blue" className="feature-tag">
                    {feature}
                  </Tag>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="action-buttons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                type="primary" 
                size="large" 
                className="action-button primary"
                block
              >
                Request Quote
              </Button>
              <Button 
                size="large" 
                className="action-button secondary"
                block
              >
                Download Specifications
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ProductDetailsModal;