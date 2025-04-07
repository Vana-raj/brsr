import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchInput.scss';

interface CustomSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  onPressEnter?: () => void;
  suggestions?: string[];
  onSuggestionSelect?: (index: number) => void;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  size = 'middle',
  onPressEnter,
  suggestions,
  onSuggestionSelect

}) => {
  return (
    <div className="custom-search-wrapper">
      <Input
        value={value}
        prefix={<SearchOutlined />}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        disabled={disabled}
        size={size}
        allowClear
        onKeyPress={(e) => e.key === 'Enter' && onPressEnter?.()}
      />
      {/* {suggestions?.length && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => onSuggestionSelect?.(index)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )} */}
    </div>

  );
};

export default CustomSearchInput;
