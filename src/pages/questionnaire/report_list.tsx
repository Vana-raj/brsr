
interface ColumnData {
  name: string[];
  created_date: string[];
  period: string[];
  progress: (number | string)[];
  status: string[];
}

// Output row format
interface RowData {
  rows: {
    name: string;
    created_date: string;
    period: string;
    progress: number | string;
    status: string;
  }[];
}

// Function to transform column data to row format
function transformColumnsToRows(data: ColumnData): RowData {
  const rows: RowData["rows"] = [];

  const length = data.name.length;

  for (let i = 0; i < length; i++) {
    rows.push({
      name: data.name[i],
      created_date: data.created_date[i],
      period: data.period[i],
      progress: data.progress[i],
      status: data.status[i],
    });
  }

  return { rows };
}



export async function fetchReportList() {
  try {
    const response = await fetch("http://192.168.2.27:1000/report_list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("transformData(data)",transformColumnsToRows(data))
    return transformColumnsToRows(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
