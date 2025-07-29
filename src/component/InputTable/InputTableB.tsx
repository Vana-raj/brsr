import { useEffect, useState } from "react";
import InputField from "../inputfield/CustomInputField";
import './InputTable.scss';

const TableInput = ({ columns, value = {}, onChange, className = "custom-table" }: any) => {
    const [data, setData] = useState<any>(value || {});

    useEffect(() => {
        if (value && typeof value === 'object') {
            setData(value);
        }
    }, [value]);

    const handleCellChange = (field: string, newValue: string) => {
        const newData = { ...data, [field]: newValue };
        setData(newData);
        onChange && onChange(newData);
    };

    return (
        <div className="table-input-container">
            <table className={className}>
                <thead>
                    <tr>
                        {columns?.map((col: string, idx: number) => (
                            <th key={idx}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {columns?.map((col: string, colIndex: number) => (
                            <td key={colIndex}>
                                <InputField
                                    value={data[col] || ""}
                                    onChange={(e: any) => handleCellChange(col, e.target.value)}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableInput;
