import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

const { Option } = Select;

interface CustomSelectProps extends SelectProps {
    options: { label: string; value: string | number }[] | any;
    showSearch?: boolean;
    mode?: "multiple" | "tags" | undefined;
}

const SelectDropDown: React.FC<CustomSelectProps> = ({
    options,
    placeholder = "Please select",
    showSearch = true,
    mode,
    ...props
}) => {
    return (
        <Select
            mode={mode}
            placeholder={placeholder}
            showSearch={showSearch}
            style={{ width: "100%", ...props.style }}
            filterOption={(input, option) => {
                if (typeof option?.label === "string") {
                    return option.label.toLowerCase().includes(input.toLowerCase());
                }
                return false;
            }}
            {...props}
        >
            {options.map((option: any) => (
                <Option key={option.value} value={option.value} label={option.label}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default SelectDropDown;
