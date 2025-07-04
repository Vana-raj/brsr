import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { Progress, Tooltip } from 'antd'
import Loader from '../../component/loader/Loader'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined,DownOutlined } from '@ant-design/icons'
import { bgColor, primaryColor } from '../../style/ColorCode';
import CustomTable from '../../component/table/CustomTable'
import CustomButton from '../../component/buttons/CustomButton'
import CustomPdfButton from '../../component/buttons/CustomPdfButton';
import './Report.scss'
import Questionnaire from '../questionnaire/Questionnaire';
import MeterCard from '../../component/cards/MeterCard';
import CircularChart from '../../component/circlepercentagechart/CircleChart';
import SectionB from './SectionB';
import SectionC from './SectionC';
const Report: React.FC = () => {
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
      sorter: (a: any, b: any) => a.progress - b.progress, // Numerical sorting
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
          placement="leftBottom"
          className="custom-tooltip"
          title={
            <div className="menu-options">
              <div className="menu-item" role="button" >
                <UnorderedListOutlined className="list-icon" />
                <div>View details</div>
              </div>
              <div className="menu-item" role="button" >
                <EditOutlined className="edit-icon" />
                <div>Edit item</div>
              </div>
              <div className="menu-item" role="button" >
                <DeleteOutlined className="delete-icon" />
                <div>Delete item</div>
              </div>
            </div>
          }>

          <div className="action-menu">
            <span
              className="three-dot-menu"
            // onClick={() => handleMenuClick(record.key)}
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
  const [isReport, setIsReport] = useState<boolean>(false);
  const [addData, setAddData] = useState<any>(null);
  const [compliantPercentage, setCompliantPercentage] = useState<number>(0);
  const [nonCompliantPercentage, setNonCompliantPercentage] = useState<number>(0);
  const [texts,setTexts]= useState<{ [key: string]: any }>({});

  

    const handlePost = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(texts),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };




  
  const handleAddData = (sectionType: string) => [
    setAddData(sectionType)
  ]
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
      };

      reader.readAsArrayBuffer(file);
    };

    input.click();
  };
  useEffect(() => {
    fetch('/report-data.json')
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

  const handleReport = (item: boolean) => {
    setIsReport(item)
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='main-report'>

      {!isReport &&
        <div className='rpt-btn'>
          <CustomButton
            label={'Add New Reports'} onClick={() => handleReport(true)} type="primary" icon={<PlusOutlined />} disabled={false}
          />
        </div>
      }
      {!isReport &&
        <div className='report-table'>
          <CustomTable
            title="Report List"
            columns={columns}
            data={data?.rows}
            bordered={false}
            pagination={true}
          />
        </div>
      }
      {isReport &&
        <div className="section-container">
          <div className="progress-header">
            <div className='back-btn' onClick={() => handleReport(false)}>
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
                  <span>40%</span>
                </div>
                <p>General Disclosures</p>
                <Progress
                  percent={40}
                  status="active"
                  showInfo={false}
                  strokeColor="#1890ff"
                  strokeWidth={10}
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
                  <span>50%</span>
                </div>
                <p>Management & Process Disclosures</p>
                <Progress
                  percent={50}
                  status="active"
                  showInfo={false}
                  strokeColor="#1890ff"
                  strokeWidth={10}
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
                  <span>60%</span>
                </div>
                <p>Principle wise performance disclosure</p>
                <Progress
                  percent={60}
                  status="active"
                  showInfo={false}
                  strokeColor="#1890ff"
                  strokeWidth={10}
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
                    percentageCompleted={nonCompliantPercentage || 60}
                    percentageRemaining={compliantPercentage || 40}
                    type={''}
                  // score={''}
                  />
                </div>
                <div>
                  <div className="Legend-first">
                    <div className="first-box"></div>
                    <span className="legend-box-compliant"></span>Section A <span className='first-percentage'>40% </span>
                  </div>
                  <div className="Legend-second">
                    <div className="second-box"></div>
                    <span className="legend-box-non-compliant"></span>Section B <span className='thirt-percentage'>60% </span>
                  </div>
                  <div className="Legend-first">
                    <div className="third-box"></div>
                    <span className="legend-box-compliant"></span>Section C <span className='second-percentage '>50% </span>
                  </div>

                </div>

              </div>
            </div>
          </div>
          
          {addData === "section_a" &&
            <Questionnaire />
          }
          {addData === "section_b" &&
            <SectionB />
          }
          {addData === "section_c" &&
            <SectionC />
          }

        </div>
      }
      
    </div>
    
  )
}

export default Report
