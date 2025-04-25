import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Table, Tooltip } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, ExportOutlined, ImportOutlined, RollbackOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import CustomSearchInput from '../inputfield/CustomSearchInput';
import { bgColor } from '../../style/ColorCode';
import './Table.scss';
interface CustomTableProps {
  columns: any[];
  data: any[];
  title?: string;
  bordered?: boolean;
  pagination?: any;
  footer?: any;
  onRow?: (record: any) => React.HTMLAttributes<HTMLElement>;
  rowSelection?: any;
  setIsDeleteModalVisible?: any;
  activeChild?: any;
  setIsRecoverModalVisible?: any;
  setIsDrawerVisible?: any;
  placeholder?: string;
  containerClass?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  title,
  bordered = false,
  pagination = false,
  footer,
  onRow,
  rowSelection = false,
  setIsDeleteModalVisible,
  activeChild,
  setIsRecoverModalVisible,
  setIsDrawerVisible,
  placeholder = "Search here...",
  containerClass = "custom-table-container"
}) => {
  const location = useLocation();


  const currentPath = location.pathname.split("/")[3];
  const currentLoc = location.pathname.split("/")[1];

  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!searchText) {
      setFilteredData(data);
      return;
    }

    const lowerSearchText = searchText.toLowerCase();
    const filtered = data.filter((row) =>
      ['supplier', 'industry', 'category', 'compliance', 'name', 'role', 'username', 'roleName', 'permissions', 'company', 'address', 'country', 'state', 'city'].some((key) =>
        row[key]?.toString().toLowerCase().includes(lowerSearchText)
      )
    );

    setFilteredData(filtered);
  }, [searchText, data]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleExport = () => {
    const customData = data.map((item, index) => ({
      "id": item.id ?? index + 1,
      "Name": item.name,
      "Username": item.username,
      "Role": item.role
    }));

    const worksheet = XLSX.utils.json_to_sheet(customData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "exported_users.xlsx");
  };


  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .csv';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const importedData = XLSX.utils.sheet_to_json(worksheet);

          setFilteredData(importedData);
        } catch (error) {
          console.error('Invalid file format', error);
        }
      };
      reader.readAsArrayBuffer(file);
    };

    input.click();
  };



  const customizedColumns = columns.map((col) => ({
    ...col,
    sorterIcon: (
      <>
        <CaretUpOutlined className="custom-sort-icon" />
        <CaretDownOutlined className="custom-sort-icon" />
      </>
    ),
  }));
  return (
    <div className={containerClass}>
      {currentPath !== "benchmark-sustainability" && currentLoc !== "questionnaire" &&
        <div className='search-bar' >
          {currentLoc !== "user-creation" &&
            <div className="table-title">{title}<span className='title-count'>({filteredData?.length})</span></div>}
          {currentLoc === "user-creation" && (activeChild === 'userList' || activeChild === 'roleList' || activeChild === 'Supplier List') && (
            <div className='display-add-delete'>
              <div className={`add-user ${rowSelection?.selectedRowKeys.length ? 'disabled' : ''}`} onClick={() => setIsDrawerVisible(true)} role='button' >
                <div>
                  <UserAddOutlined />
                </div>
                <div className='add-useritem'> {activeChild === 'userList' ? "Add a user"
                  : activeChild === 'Supplier List' ? "Add a Supplier"
                    : "Add a role"} </div></div>
              <div className={`add-user ${rowSelection?.selectedRowKeys.length === 0 ? 'disabled' : ''}`} onClick={() => setIsDeleteModalVisible(true)} role='button' >
                <div>
                  <UserDeleteOutlined />
                </div>
                <div className='add-useritem'>{activeChild === 'userList' ? "Delete a user" : activeChild === 'Supplier List' ? "Delete a Supplier" : " Delete a role"}</div></div>
            </div>
          )}
          {currentLoc === "user-creation" && (activeChild === 'deletedUsers' || activeChild === 'deletedRole' || activeChild === 'Deleted Supplier') && (
            <div className={`add-user ${rowSelection?.selectedRowKeys.length === 0 ? 'disabled' : ''}`} role='button' onClick={() => setIsRecoverModalVisible(true)}>
              <div>
                <RollbackOutlined />
              </div>
              <div className='add-useritem'>Recover Deleted Users</div>
            </div>
          )}

          <div className='search-dot'>
            <CustomSearchInput
              value={searchText}
              onChange={handleSearchChange}
              placeholder={placeholder}
            />
            {currentLoc === "user-creation" &&
              <Tooltip
                color={bgColor}
                placement="bottom"
                className="custom-tooltip"
                title={
                  <div className="menu-options">
                    <div className="menu-item" role="button" onClick={handleImport}>
                      <ImportOutlined />
                      <div>Import item</div>
                    </div>
                    <div className="menu-item" role="button" onClick={handleExport}>
                      <ExportOutlined />
                      <div>Export item</div>
                    </div>
                  </div>
                }>
                <div className="action-menu">
                  <span
                    className="three-dot"
                  >
                    ...
                  </span>
                </div>
              </Tooltip>
            }
          </div>
        </div>
      }
      <Table
        columns={customizedColumns}
        dataSource={filteredData}
        pagination={pagination}
        bordered={bordered}
        className="custom-table"
        onRow={onRow}
        footer={footer}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default CustomTable;
