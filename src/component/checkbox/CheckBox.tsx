import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import '../style/CheckBox.scss'; 

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (e: CheckboxChangeEvent) => void;
  label: string;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, label, disabled = false }) => {
  return (
    <div className="checkbox-wrapper">
      <Checkbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`checkbox ${disabled ? 'checkbox-disabled' : ''}`} 
      />
      <span className={`checkbox-label ${disabled ? 'checkbox-disabled' : ''}`}>{label}</span>
    </div>
  );
};

export default CustomCheckbox;
