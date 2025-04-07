import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import "./FinancialTable.scss";

interface TableProps {
  name: string;
  currency: string;
  "2024": string;
  "2023_1": string;
  "2023_2": string;
}

const FinancialTable: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    fetch('/financial-data.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error)
        setLoading(true);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="financial-table-container">
      <table className="financial-table">
        <thead>
          <tr>
            {data?.columns?.map((col: string, index: number) => (
              <th key={index ?? null}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.rows?.map((row: TableProps, index: number) => (
            <tr key={row.name}>
              <td>{row?.name}</td>
              <td>{row.currency}</td>
              <td>{row["2024"]}</td>
              <td>{row["2023_1"]}</td>
              <td>{row["2023_2"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
