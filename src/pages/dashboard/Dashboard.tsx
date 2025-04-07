import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useAppSelector } from "../../features/RDXHook";
import CustomCard from "../../component/cards/CustomCard";
import MeterCard from "../../component/cards/MeterCard";
import CustomTable from "../../component/table/CustomTable";
import {
  AuditsIcon,
  DeliveryIcon,
  SuppliersIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  WarningIcon,
} from "../../utils/CardIcons";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../component/popup/CustomModel";
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Form, Switch, Tooltip } from "antd";
import Loader from "../../component/loader/Loader";
import EditRow from "./EditRow";
import CustomButton from "../../component/buttons/CustomButton";
import { fetchSupplierListData } from "../../features/action/SupplierAction";
import { setSelectedRecord, setSuppliers } from "../../features/slices/SupplierSlice";
import { useDispatch } from "react-redux";
import { bgColor } from "../../style/ColorCode";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const suppliers = useAppSelector((state) => state.suppliers?.data);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => setIsTrue(true);
  const hideModal = () => setIsTrue(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedValue, setSelectedValue] = useState<string>("This Month");
  const [rowType, setRowType] = useState<string>('')
  const [compliantPercentage, setCompliantPercentage] = useState<number>(0);
  const [nonCompliantPercentage, setNonCompliantPercentage] = useState<number>(
    0
  );
  const [isTrue, setIsTrue] = useState(false)
  const [singleDeleteData, setSingleDeleteData] = useState<string | any>(null)
  const [visibleRow, setVisibleRow] = useState<string | null>(null);
  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleRowClick = (id: string, record: any) => {
    navigate(`/supplier/${id}/overview`);
    localStorage.setItem("record", JSON.stringify(record));
    dispatch(setSelectedRecord(record));

  };
  const handleDetails = (id: string, record: any) => {
    navigate(`/supplier/${id}/overview`);
    localStorage.setItem("record", JSON.stringify(record));
    dispatch(setSelectedRecord(record));

  }

  const handleMenuClick = (rowKey: string) => {
    setVisibleRow(visibleRow === rowKey ? null : rowKey);
  };

  const handleEdit = (row: any, p0: string) => {
    setRowType(p0)
    setSingleDeleteData(row)
    showModal()
  };
  const handleStatus = (row: any, p0: string) => {
    setRowType(p0)
    setSingleDeleteData(row)
    showModal()
  };

  const handleDelete = (row: any, p0: string) => {
    setRowType(p0)
    setSingleDeleteData(row)
    showModal()
  };

  const columns = [
    {
      title: "Suppliers",
      dataIndex: "supplier",
      key: "supplier",
      sorter: (a: any, b: any) => a.supplier.localeCompare(b.supplier),
      render: (text: string, record: any) => (
        <span
          className="supplier-name"
          onClick={() => handleRowClick(record.key, record)}
          role="button"
        >
          {text}
        </span>
      ),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      sorter: (a: any, b: any) => a.industry.localeCompare(b.industry),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a: any, b: any) => a.industry.localeCompare(b.industry),
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      sorter: (a: any, b: any) => a.riskScore - b.riskScore,
      render: (score: number) => (
        <span
          className={
            score > 70 ? "risk-high" : score > 40 ? "risk-medium" : "risk-low"
          }
        >
          {score}
        </span>
      ),
    },
    {
      title: "Risk Level",
      dataIndex: "riskLevel",
      key: "riskLevel",
      sorter: (a: any, b: any) => a.riskLevel.localeCompare(b.riskLevel),
      render: (level: any) => (
        <span
          className={
            level === "Low"
              ? "risk-high"
              : level === "Medium"
                ? "risk-medium"
                : level === "High"
                  ? "risk-low"
                  : ""
          }
        >
          {level}
        </span>
      ),
    },
    {
      title: "Compliance",
      dataIndex: "compliance",
      key: "compliance",
      sorter: (a: any, b: any) => a.compliance.localeCompare(b.compliance),
      render: (level: any) => (
        <span
          className={
            level === "Compliant"
              ? "risk-high"
              : level === "Non-Compliant"
                ? "risk-low"
                : ""
          }
        >
          {level}
        </span>
      ),
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
      render: (_: any, record: any) => (
        <Switch
          checked={!record?.status}
          size="small"
          onClick={() => handleStatus(record, "status")}
        />
      ),
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
              <div className="menu-item" role="button" onClick={() => handleDetails(record.key, record)}>
                <UnorderedListOutlined className="list-icon" />
                <div>View details</div>
              </div>
              <div className="menu-item" role="button" onClick={() => handleEdit(record, "edit")}>
                <EditOutlined className="edit-icon" />
                <div>Edit item</div>
              </div>
              <div className="menu-item" role="button" onClick={() => handleDelete(record, "delete")}>
                <DeleteOutlined className="delete-icon" />
                <div>Delete item</div>
              </div>
            </div>
          }>

          <div className="action-menu">
            <span
              className="three-dot-menu"
              onClick={() => handleMenuClick(record.key)}
            >
              •••
            </span>
          </div>
        </Tooltip>
      ),
    },
  ];

  const handleOk = async () => {
    switch (rowType) {
      case "delete":
        console.log("Deleting:", singleDeleteData?.supplier);
        break;
      case "edit":
        form.validateFields()
          .then(values => {
            const newUser: any = { key: String(suppliers.length + 1), ...values };
            setSuppliers([...suppliers, newUser]);
          })
          .catch(error => {
            console.log('errorr')
          })
        console.log("Editing:", singleDeleteData?.supplier);
        break;
      case "status":
        console.log("Changing Status for:", singleDeleteData?.supplier);
        break;
      default:
        break;
    }
    hideModal();
  };


  const navigate = useNavigate();


  const calculateCompliancePercentages = useCallback(() => {
    const total = suppliers.length;
    const compliantCount = suppliers.filter(
      (row: any) => row.compliance === "Compliant"
    ).length;
    const nonCompliantCount = suppliers.filter(
      (row: any) => row.compliance === "Non-Compliant"
    ).length;

    const compliantPct = Math.round((compliantCount / total) * 100);
    const nonCompliantPct = Math.round((nonCompliantCount / total) * 100);

    setCompliantPercentage(compliantPct);
    setNonCompliantPercentage(nonCompliantPct);
  }, [suppliers]);

  useEffect(() => {
    fetchSupplierListData({ setData, setLoading, calculateCompliancePercentages });
  }, [calculateCompliancePercentages]);





  if (loading) {
    return <Loader />;
  }

  const icons = [
    <SuppliersIcon key={"supplier"} />,
    <ThumbsDownIcon key={"thumbsdown"} />,
    <ThumbsUpIcon key={"thumbsup"} />,
    <WarningIcon key={"warning"} />,
    <AuditsIcon key={"audits"} />,
    <DeliveryIcon key={"delivery"} />,
  ];

  const options = [
    { label: "This Month", value: "1" },
    { label: "Last Year", value: "2" },
  ];

  const getTitle = (rowType: string) => {
    switch (rowType) {
      case "delete":
        return "Do you want to Delete this User?";
      case "edit":
        return "Edit";
      case "status":
        return "Do you want to change the Status?";
      default:
        return "";
    }
  };
  const getCancelName = (rowType: string) => {
    switch (rowType) {
      case "delete":
        return <><CustomButton key="cancel" type='default' onClick={hideModal} label={"No"} /><CustomButton key="ok" type="primary" onClick={handleOk} label={"Yes"} /></>;
      case "edit":
        return <><CustomButton key="cancel" type='default' onClick={hideModal} label={"Cancel"} /><CustomButton key="ok" type="primary" onClick={handleOk} label={"edit"} /></>;
      case "status":
        return <><CustomButton key="cancel" type='default' onClick={hideModal} label={"No"} /><CustomButton key="ok" type="primary" onClick={handleOk} label={"Yes"} /></>;
      default:
        return "";
    }
  };

  const getComponent: any = (rowType: string) => {
    switch (rowType) {
      case "delete":
        return <div>{singleDeleteData?.supplier}</div>
      case "edit":
        return <EditRow singleDeleteData={singleDeleteData} form={form} />;
      case "status":
        return <div>{singleDeleteData?.status}</div>;
      default:
        return "";
    }
  };
  return (
    <div className="Dashboard-main">
      <div className="cards-flex">
        <div className="multi-cards">
          {data &&
            data[0]?.data?.map((item: any, index: number) => (
              <CustomCard
                key={index}
                title={item?.name || "Default Title"}
                content={item?.value || "Default Content"}
                icon={icons[index]}
                isLow={item?.value}
              />
            ))}
        </div>
        <div className="single-card">
          <MeterCard
            title="Compliance"
            options={options}
            value={selectedValue || ""}
            compliantPercentage={compliantPercentage}
            nonCompliantPercentage={nonCompliantPercentage}
            onChange={handleDropdownChange}
          />
        </div>
      </div>
      <CustomTable
        title="Supplier List"
        columns={columns}
        data={suppliers}
        bordered={false}
        pagination={true}
      />

      <CustomModal
        visible={isTrue}
        onClose={hideModal}
        onCancel={hideModal}
        title={getTitle(rowType)}
        content={getComponent(rowType)}
        onOk={handleOk}
        footer={getCancelName(rowType)}
      />
    </div>
  );
};

export default Dashboard;
