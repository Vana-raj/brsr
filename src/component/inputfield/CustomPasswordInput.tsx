import React, { useState } from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import '../style/PasswordInput.scss';

interface CustomPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="custom-password-wrapper">
      {label && <span className="input-label">{label}</span>}

      <Input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Enter your password'}
        disabled={disabled}
      />

      <span className="eye-icon" onClick={toggleVisibility}>
        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </span>
    </div>
  );
};

export default CustomPasswordInput;
