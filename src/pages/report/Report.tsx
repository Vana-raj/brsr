import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { Progress, Tooltip , message} from 'antd'
import Loader from '../../component/loader/Loader'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined,DownloadOutlined } from '@ant-design/icons'
import { bgColor, primaryColor } from '../../style/ColorCode';
import CustomTable from '../../component/table/CustomTable'
import CustomButton from '../../component/buttons/CustomButton'
import CustomPdfButton from '../../component/buttons/CustomPdfButton';
import './Report.scss'
import MeterCard from '../../component/cards/MeterCard';
import CircularChart from '../../component/circlepercentagechart/CircleChart';
import SectionB from './SectionB';
import SectionC from './SectionC';
import { fetchReportList } from '../questionnaire/reportActions';
import Questionnaire from '../questionnaire/Questionnaire';
import QuestionnaireWrapper from '../questionnaire/QuestionnaireWrapper';
import { useNavigate, useParams } from 'react-router-dom';

const Report: React.FC = () => {
    const { mode, section } = useParams();
  
  const [selectedIndex, setSelectedIndex] = useState<string>("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      sorter: (a: any, b: any) => a.created_date.localeCompare(b.created_date),
    },

    {
      title: "Period",
      dataIndex: "period",
      key: "period",
      sorter: (a: any, b: any) => a.period.localeCompare(b.period),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      sorter: (a: any, b: any) => a.progress - b.progress, 
      render: (progress: number) => (
        <Progress
          percent={progress}
          status={progress >= 100 ? 'success' : 'active'}
          showInfo={true}
          strokeColor={progress >= 100 ? '#52c41a' : primaryColor}
          strokeWidth={15}
        />
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => {
        const statusA = a.status ? String(a.status) : '';
        const statusB = b.status ? String(b.status) : '';
        return statusA.localeCompare(statusB);
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (index: number, record: any) => (
        <Tooltip
          color={bgColor}
          trigger={'click'}
          placement="leftBottom"
          className="custom-tooltip"
          title={
            <div className="menu-options">
              <div className="menu-item" role="button" >
                <UnorderedListOutlined className="list-icon" />
                <div>View details</div>
              </div>
              <div className="menu-item" role="button" onClick={()=>handleEdit(index)}>
                <EditOutlined className="edit-icon" />
                <div>Edit item</div>
              </div>
              <div className="menu-item" role="button" onClick={()=>handleDelete(index)}>
                <DeleteOutlined className="delete-icon" />
                <div>Delete item </div>
              </div>
              <div className="menu-item" role="button" onClick={() => handlePdf(index)}>
                <DownloadOutlined className="delete-icon" />
                <div>Download pdf</div>
              </div>
            </div>
          
          }>

          <div className="action-menu">
            <span
              className="three-dot-menu"
            >
              •••
            </span>
          </div>
        </Tooltip>
      ),
    },
  ];
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [addData, setAddData] = useState<any>("section_a");
  const [singledata, setSingleData] = useState<any>(null);
  
  const [sectionProgressPercentage, setSectionProgressPercentage] = useState<number>(0);
  const [sectionBProgressPercentage, setSectionBProgressPercentage] = useState<number>(0);
  const [sectionCProgressPercentage, setSectionCProgressPercentage] = useState<number>(0);
  const [editonlyState, setEditonlyState] = useState<boolean>(false);
const navigate = useNavigate();
const handleEdit = async (index:any) => {
  try {
    const response = await fetch(`http://192.168.2.27:1000/edit_pdf_report_get/${encodeURIComponent(index.name)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
      
    });
    setSelectedIndex(index.name)
    setEditonlyState(mode === 'edit' ? true : false);
    if (!response.ok) {
      throw new Error(`HTTP Status: ${response.status}`);
    }
    const data = await response.json();
   setSelectedIndex(index.name);
     setEditonlyState(mode === 'edit' ? true : false);
  setAddData(data.section);
  setSingleData(data)
  navigate(`/brsr/reports/questionnaire/edit/${data.section}`);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const handleDelete=async (index:any)=>{
  try {
    const response = await fetch(`http://192.168.2.27:1000/delete_pdf_report/${encodeURIComponent(index.name)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    if (!response.ok) {
      throw new Error(`HTTP Status: ${response.status}`);
    }
    const data = await response.json();

    message.success(`${data} deleted successfully!`);
  } catch (error) {
    console.error("Fetch error:", error);
  }

};

console.log(singledata,'singledata')

const handlePdf = async (index: any) => {

  try {
    const response = await fetch(`http://192.168.2.27:1000/download_pdf_report/${encodeURIComponent(index.name)}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP Status: ${response.status}`);
    }
    const blob = await response.blob();

    const contentDisposition = response.headers.get("Content-Disposition");
    let fileName = index.name+".pdf";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        fileName = match[1];
      }
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    message.success(`${fileName} downloaded successfully!`);
  } catch (error) {
    console.error("Download error:", error);
    message.error("Failed to download PDF.");
  }
};

  

 const handleAddData = (sectionType: string) => {
  setAddData(sectionType);
  navigate(`/brsr/reports/questionnaire/add/${sectionType}`);
};
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .csv";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const arrayBuffer = e.target?.result;
          if (!arrayBuffer) return;

          const data = new Uint8Array(arrayBuffer as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const importedData: unknown[] = XLSX.utils.sheet_to_json(worksheet);


        } catch (error) {
          console.error("Invalid file format", error instanceof Error ? error.message : error);
        }
      }

      reader.readAsArrayBuffer(file);
    };

    input.click();
  };


useEffect(() => {
  const loadReportData = async () => {
    try {
      const reportData = await fetchReportList();
      if (reportData) {
        setData(reportData?.rows);
      } else {
        console.error('No data received');
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  loadReportData();
}, []);



  const handleReport = (item: string) => {
  navigate(`/brsr/reports/questionnaire/add/${item}`);
  }
  const handleback = () => {
  navigate(`/brsr/reports`);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='main-report'>
      {!section &&
        <div className='rpt-btn'>
          <CustomButton
            label={'Add New Reports'} onClick={() => handleReport("section_a")} type="primary" icon={<PlusOutlined />} disabled={false}
          />
        </div>
      }

      {!section &&
        <div className='report-table'>
          <CustomTable
            title="Report List"
            columns={columns}
            data={data?.reports}
            bordered={false}
            pagination={true}
          />
        </div>
      }
      {section &&
        <div className="section-container">
          <div className="progress-header">
            <div className='back-btn' onClick={() => handleback()}>
              <ArrowLeftOutlined color='' />
              <div>BRSR 2025</div>
            </div>
          </div>
          <div className='top-sections'>
            <div className="section-cards">
              <div className={`section-card ${addData === 'section_a' ? 'selected' : addData ? 'faded' : ''}`}
                onClick={() => handleAddData('section_a')}
              >
                <div className="section-header">
                  <div className='xbrl-header'>SECTION A</div>
                  <span>{sectionProgressPercentage}%</span>
                </div>
                <p>General Disclosures</p>
                <Progress
                  percent={sectionProgressPercentage}
                  status="active"
                  showInfo={false}
                  strokeColor="#1890ff"
                />
                <div className="add-data-btn">
                  <CustomButton
                    label="ADD DATA"
                    type="primary"
                    disabled={addData === 'section_a'}
                    icon={<ArrowLeftOutlined style={{ transform: 'rotate(180deg)' }} />}
                  />
                </div>
              </div>

              <div className={`section-card ${addData === 'section_b' ? 'selected' : addData ? 'faded' : ''}`}
                onClick={() => handleAddData('section_b')}
              >
                <div className="section-header">
                  <div className='xbrl-header'>SECTION B</div>
                  <span>{sectionBProgressPercentage}%</span>
                </div>
                <p>Management & Process Disclosures</p>
                <Progress
                  percent={sectionBProgressPercentage}
                  status="active"
                  showInfo={false}
                  strokeColor="#1890ff"
                />
                <div className="add-data-btn">
                  <CustomButton
                    label="ADD DATA"
                    type="primary"
                    disabled={addData === 'section_b'}
                    icon={<ArrowLeftOutlined style={{ transform: 'rotate(180deg)' }} />}
                  />
                </div>
              </div>

              <div className={`section-card ${addData === 'section_c' ? 'selected' : addData ? 'faded' : ''}`}
                onClick={() => handleAddData('section_c')}
              >
                <div className="section-header">
                  <div className='xbrl-header'>SECTION C </div>
                  <span>{sectionCProgressPercentage}%</span>
                </div>
                <p>Principle wise performance disclosure</p>
                <Progress
                  percent={sectionCProgressPercentage}
                  status="active"
                  showInfo={false}
                  strokeColor="#1890ff"
                />
                <div className="add-data-btn">
                  <CustomButton
                    label="ADD DATA"
                    type="primary"
                    disabled={addData === 'section_c'}
                    icon={<ArrowLeftOutlined style={{ transform: 'rotate(180deg)' }} />}
                  />
                </div>
              </div>

            </div>
            <div className="progress-cards">
              <div className='progress-card'>
                <div>
                  <CircularChart
                    percentageCompleted={sectionProgressPercentage || 60}
                    percentageRemaining={sectionBProgressPercentage || 40}
                    percentageMiddle={sectionCProgressPercentage || 50}
                    type={''}
                  />
                </div>
                <div>
                  <div className="Legend-first">
                    <div className="first-box"></div>
                    <span className="legend-box-compliant"></span>Section A <span className='first-percentage'>{sectionProgressPercentage}% </span>
                  </div>
                  <div className="Legend-second">
                    <div className="second-box"></div>
                    <span className="legend-box-non-compliant"></span>Section B <span className='thirt-percentage'>{sectionBProgressPercentage}% </span>
                  </div>
                  <div className="Legend-first">
                    <div className="third-box"></div>
                    <span className="legend-box-compliant"></span>Section C <span className='second-percentage '>{sectionCProgressPercentage}% </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <QuestionnaireWrapper addData={addData} putdata={[]} selectedindex={selectedIndex} editOnly={editonlyState} setSectionProgressPercentage={setSectionProgressPercentage} setSectionBProgressPercentage={setSectionBProgressPercentage} setSectionCProgressPercentage={setSectionCProgressPercentage} />
        </div>
      }
      
    </div>
    
  )
}

export default Report;