import React from 'react';
import { Modal, Button, Progress, Tag } from 'antd';
import { ThunderboltOutlined, SettingOutlined, SafetyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './ProductDetailsModal.css';

const ProductDetailsModal = ({ visible, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal
      title={product.title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="product-details-modal"
      destroyOnClose={true}
    >
      <motion.div 
        className="product-modal-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3,
          staggerChildren: 0.1
        }}
      >
        <motion.div 
          className="product-modal-image-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: 0.2
          }}
        >
          <motion.img 
            src={product.image} 
            alt={product.title}
            className="product-modal-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="product-modal-info"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: 0.3
          }}
        >
          <motion.div 
            className="product-modal-specs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Product Specifications</h3>
            <div className="specs-grid">
              <motion.div 
                className="spec-item"
                whileHover={{ scale: 1.05 }}
              >
                <ThunderboltOutlined className="spec-icon" />
                <div>
                  <h4>Power Output</h4>
                  <p>{product.powerOutput || '5000W'}</p>
                </div>
              </motion.div>
              <motion.div 
                className="spec-item"
                whileHover={{ scale: 1.05 }}
              >
                <SettingOutlined className="spec-icon" />
                <div>
                  <h4>Efficiency</h4>
                  <Progress 
                    percent={product.efficiency || 98} 
                    status="active" 
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                </div>
              </motion.div>
              <motion.div 
                className="spec-item"
                whileHover={{ scale: 1.05 }}
              >
                <SafetyOutlined className="spec-icon" />
                <div>
                  <h4>Warranty</h4>
                  <p>{product.warranty || '10 Years'}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="product-modal-description"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>Description</h3>
            <p>{product.desc || 'This advanced solar inverter offers industry-leading efficiency and reliability. Designed for both residential and commercial applications, it features smart monitoring capabilities and robust protection systems.'}</p>
          </motion.div>
          
          <motion.div 
            className="product-modal-features"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Key Features</h3>
            <div className="feature-tags">
              {(product.tags || ['Smart Monitoring', 'High Efficiency', 'Compact Design']).map((tag, index) => (
                <Tag key={index} color="blue">{tag}</Tag>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="product-modal-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button type="primary" size="large">
              Request Quote
            </Button>
            <Button size="large">
              Download Specs
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Modal>
  );
};

export default ProductDetailsModal;