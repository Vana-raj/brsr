import React from 'react';
import { Modal } from 'antd';
import './Model.scss';

interface CustomModalProps {
  visible: boolean;
  onClose?: () => void;
  title: string;
  content: any;
  onOk?: () => void;
  onCancel?: () => void | undefined;
  footer?: React.ReactNode;
  closable?: boolean;
  className?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  content,
  onOk,
  footer,
  closable = true,
  className = 'modal'
}) => {
  return (
    <div className="custom-modal">
      <Modal
        title={title}
        open={visible}
        onCancel={onClose}
        onOk={onOk}
        footer={footer}
        centered
        destroyOnClose={true}
        closable={closable}
        className={className}
      >
        {content}
      </Modal>
    </div>
  );
};

export default CustomModal;
