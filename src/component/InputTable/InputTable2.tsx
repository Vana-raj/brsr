import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import CustomButton from "../buttons/CustomButton";
import InputField from "../inputfield/CustomInputField";
import './InputTable.scss'
import { Result } from "antd";

const TableInput = ({ columns, rows, value, header, onChange, className = "custom-table" }: any) => {
    console.log("columns",columns)
    console.log("rows",rows)
    console.log("value",value)
    console.log("header",header)
    console.log("onChange",onChange)
    console.log("className",className)
    const [data, setData] = useState(() => {
        if (rows) {
            return rows.map((row: any) => ({ particulars: row }));
        }
        return value && value.length > 0 ? value : [{}];
    });

    useEffect(() => {
        if (value && value.length > 0) {
            setData(value);
        }
    }, [value]);
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
// console.log("data",data)
const result: Record<string, string> = {};

data.forEach((item: { P1: string; P2: string | null }) => {
    result[item.P1] = item.P2 ?? "";  // Use empty string if P2 is null
});

console.log("data",typeof result,result);
  const principles = Object.keys(result);
  const statuses = principles.map((p) =>
    result[p] !== undefined && result[p] !== null ? result[p] : ""
  );
return (
        <>
            <div className="table-input-container">
                <table className={className} border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            {principles.map((p, i) => (
                                <th key={i}>{p}</th>))}
                                </tr>                    
                                </thead>
                                <tbody>
                                    <tr>
                                        {statuses.map((s, i) => (
                                            <td key={i}>{s}</td>))}</tr>
                                            </tbody>                </table>
            </div>
            {!rows && (
                <div className="add-row">
                    <CustomButton label={"+ Add Row"} onClick={addRow} />
                </div>
            )}
        </>
    );
};

export default TableInput;