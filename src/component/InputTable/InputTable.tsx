import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import CustomButton from "../buttons/CustomButton";
import InputField from "../inputfield/CustomInputField";
import './InputTable.scss'

const TableInput = ({ columns, rows, value, header, onChange, className = "custom-table" }: any) => {
    const [data, setData] = useState(() => {
        if (rows) {
            return rows.map((row: string) => ({ particulars: row }));
        }
        return value && value.length > 0 ? value : [{}];
    });
    const addRow = () => {
        if (rows) return;
        const newData = [...data, {}];
        setData(newData);
        onChange(newData);
    };

    const deleteRow = (index: number) => {
        if (data.length <= 1) return;
        const newData = data.filter((_: any, i: any) => i !== index);
        setData(newData);
        onChange(newData);
    };

    const handleCellChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        setData(newData);
        onChange(newData);
    };

    return (
        <div className="table-input-container">
            <table className={className}>
                <thead>
                    <tr>
                        {rows && <th>{header}</th>}
                        {columns?.map((col: string, idx: number) => (
                            <th key={idx}>{col}</th>
                        ))}
                        {!rows && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: any, index: number) => (
                        console.log(row, 'row'),
                        <tr key={index}>
                            {rows && <td>{header === "Policy" ? row.particulars : index + 1}</td>}
                            {columns.map((col: string, colIndex: number) => (
                                <td key={colIndex}>
                                    <InputField
                                        value={row[col] || ""}
                                        onChange={(e: any) =>
                                            handleCellChange(index, col, e.target.value)
                                        }
                                    />
                                </td>
                            ))}
                            {!rows && (
                                <td>
                                    <CustomButton
                                        icon={<DeleteOutlined />}
                                        onClick={() => deleteRow(index)}
                                        label={""}
                                        disabled={data.length === 1}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {!rows && (
                <div className="add-row">
                    <CustomButton label={"+ Add Row"} onClick={addRow} />
                </div>
            )}
        </div>
    );
};

export default TableInput;