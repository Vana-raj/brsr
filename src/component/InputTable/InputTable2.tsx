import { useEffect, useState } from "react";
import InputField from "../inputfield/CustomInputField";
import './InputTable.scss';
 
const TableInput = ({ columns, value = [], onChange, className = "custom-table" }: any) => {
    const [data, setData] = useState<string[]>(value);
 
    useEffect(() => {
        if (Array.isArray(value)) {
            setData(value);
        }
    }, [value]);
 
    const handleCellChange = (index: number, newValue: string) => {
        const newData = [...data];
        newData[index] = newValue;
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
                                    value={data[colIndex] || ""}
                                    onChange={(e: any) => handleCellChange(colIndex, e.target.value)}
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