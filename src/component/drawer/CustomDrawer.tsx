import React from 'react';
import { Drawer } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import './Drawer.scss';

interface CustomDrawerProps extends DrawerProps {
  title: string;
  onClose?: () => void;
  visible: boolean;
  footerContent?: React.ReactNode;
  content?: any;
  width?: any
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  title,
  onClose,
  visible,
  footerContent,
  content,
  width,
  ...props
}) => {
  return (
    <Drawer
      className="custom-drawer"
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={width}
      {...props}
    >
      <div className="custom-content">
        {content}
      </div>

      <div className="custom-footer">
        {footerContent}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
