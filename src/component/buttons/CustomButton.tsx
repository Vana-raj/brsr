import React from 'react';
import { Button } from 'antd';
import '../buttons/Buttons.scss';

interface ButtonProps {
  label: string | any;
  onClick?: any;
  type?: "primary" | "outline" | "secondary" | "default" | "pdf";
  icon?: any;
  className?: string;
  disabled?: any;
  htmlType?: string | any;
  size?: string | any;
}

const CustomButton: React.FC<ButtonProps> = ({ label, onClick, type = "primary", icon, className = "primary-button", disabled, htmlType, size }) => {
  return (
    <>
      {type === 'primary' ? (
        <Button className={className} type="primary" htmlType={htmlType} disabled={disabled} onClick={onClick} icon={icon} size={size}>
          {label}
        </Button>
      ) : (
        <Button className="outline-button" htmlType={htmlType} onClick={onClick} disabled={disabled} icon={icon} size={size}>
          {label}
        </Button>
      )}

    </>
  );
};

export default CustomButton;
