import React from 'react';
import { Input as AntInput } from 'antd';
import './Input.scss';

type InputVariant = 'outlined' | 'filled' | 'borderless';

interface InputProps {
  placeholder?: string;
  variant?: InputVariant;
  [key: string]: any;
  type?: string;
}

const InputField: React.FC<InputProps> = ({ placeholder, variant = 'outlined', type, ...props }) => {
  const inputClass = `input-field input-field--${variant}`;

  return (
    <AntInput
      {...props}
      placeholder={placeholder}
      className={inputClass}
      type={type}
    />
  );
};

export default InputField;
