import React from 'react';
import { Select } from 'antd';
import './DropdownInput.scss';

interface DropdownInputProps {
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  onChange?: (value: string | number) => void;
  value?: string | number;
  disabled?: boolean;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
  value,
  disabled = false,
}) => {
  return (
    <Select
      className="custom-dropdown"
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
      defaultValue={value}
      variant={'outlined'}
      popupClassName="dropdown-options"
    />
  );
};

export default DropdownInput;
