import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Switch, Tooltip } from 'antd';
import { useAppSelector } from '../../../features/RDXHook';
import CustomTable from '../../../component/table/CustomTable';
import { setSelectedRecord } from '../../../features/slices/SupplierSlice';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { bgColor } from '../../../style/ColorCode';
import './SupplierTable.scss'

const SupplierTable: React.FC = () => {
    const suppliers = useAppSelector((state) => state.suppliers?.data);

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
    const [visibleRow, setVisibleRow] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRowClick = (id: string, record: any) => {
        navigate(`/supplier/${id}/overview`);
        localStorage.setItem("record", JSON.stringify(record));
        dispatch(setSelectedRecord(record));
    };

    const handleStatus = (row: any, p0: string) => {
        alert('clicked')
    };

    const handleMenuClick = (rowKey: string) => {
        setVisibleRow(visibleRow === rowKey ? null : rowKey);
    };

    const handleDetails = (id: string, record: any) => {
        navigate(`/supplier/${id}/overview`);
        localStorage.setItem("record", JSON.stringify(record));
        dispatch(setSelectedRecord(record));

    }

    const handleEdit = (row: any, p0: string) => {
        alert('clicked')
    };

    const handleDelete = (row: any, p0: string) => {
        alert('clicked')
    };

    return (
        <div className='supplier-main'>
            <CustomTable
                title="Supplier List"
                columns={columns}
                data={suppliers}
                bordered={false}
                pagination={true}
            />
        </div>
    )
}

export default SupplierTable
