import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import "./EnvironmentalTable.scss";

const EnvironmentalTable: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    fetch("/environmental-data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const getCellColor = (name: string, value: string) => {
    const numericValue = parseFloat(value);
    const conditionalRows = ["Fatalities", "Major injuries", "Lost time accidents", "Dangerous occurrences", "Near miss occurrences"];

    if (name === "Person hours worked") {
      return "";
    }

    if (conditionalRows.includes(name)) {
      if (numericValue < 1) return "green-cell";
      if (numericValue >= 1 && numericValue <= 2) return "red-cell";
      if (numericValue >= 3) return "orange-cell";
    }

    return "green-cell";
  };


  return (
    <div className="environmental-table-container">
      <table className="environmental-table">
        <thead>
          <tr>
            {data?.columns?.map((col: string, index: number) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.rows?.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              <td>{row?.name}</td>
              {["suppliers", "industry", "risk_Score", "risk_Level", "compliance"].map((key, cellIndex) => (
                <td key={cellIndex} className={getCellColor(row.name, row[key])}>
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnvironmentalTable;
