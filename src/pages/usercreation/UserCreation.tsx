import React, { useEffect, useMemo, useState } from 'react';
import './UserCreation.scss';
import { Card, Collapse, Modal, Form, Input, List, Button, message, Tooltip, Checkbox, Row, Col, Table } from 'antd';
import CustomTable from '../../component/table/CustomTable';
import CustomDrawer from '../../component/drawer/CustomDrawer';
import { EditOutlined, SettingOutlined, ShopOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { bgColor } from '../../style/ColorCode';
import CreateCompanyForm from './createCompany/CompanyForm';
import DateTimeFormat from './dateandtime/DateTimeFormat';
import SelectDropDown from '../../component/select/SelectDropDown';
import EmailForm from './emailForm/EmailForm';

const { Panel } = Collapse;

interface UserData {
    key: string;
    name: string;
    username: string;
    role: string;
    password: string;
    firstname: string;
    lastname: string;
}

interface RoleData {
    key: string;
    roleName: string;
    permissions: string;
}

interface CompanyData {
    key: string;
    company: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zip: string;
}

interface FormData {
    company: string;
    hq: boolean;
    address: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    icon: null | string;
}

const UserCreation: React.FC = () => {
    const [activeChild, setActiveChild] = useState('userList');
    const [isUserDrawerVisible, setIsUserDrawerVisible] = useState(false);
    const [deletedCompanies, setDeletedCompanies] = useState<CompanyData[]>([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editSelectedKey, setEditSelectedKey] = useState<string>('');
    const [editSelectedCompany, setEditSelectedCompany] = useState<string | null>(null);
    const [tlsSwitch, setTlsSwitch] = useState<boolean>(true)
    const [roleData, setRoleData] = useState<RoleData[]>([
        { key: "admin", roleName: "Administrator", permissions: "All Access" },
        { key: "editor", roleName: "Editor", permissions: "Edit Content" },
        { key: "viewer", roleName: "Viewer", permissions: "Read-Only" },
    ]);
    const [deletedRoles, setDeletedRoles] = useState<RoleData[]>([]);
    const [roleDataOption, setRoleDataOption] = useState<{ value: string; label: string }[]>([]);
    const [userData, setUserData] = useState<UserData[]>([
        { key: "vanaraj123", name: "vanaraj", firstname: 'vana', lastname: 'raj', username: "vanaraj123@gmail.com", role: "Administrator", password: "vanarj@123" },
        { key: "stark456", name: "stark", firstname: 'stark', lastname: 'k', username: "stark456@gmail.com", role: "User", password: "stark@456" },
        { key: "samrat789", name: "samrat", firstname: 'sam', lastname: 'rat', username: "samrat789@outlook.com", role: "Manager", password: "samrat98@121" },
        { key: "mrwhite101", name: "Mr White", firstname: 'Mr', lastname: 'White', username: "white101meth@gmail.com", role: "Editor", password: "white@meth1" },
        { key: "nolan202", name: "nolan", firstname: 'no', lastname: 'lan', username: "nolan202gmai.com", role: "Viewer", password: "interstellar@123467" }
    ]);
    const [companyData, setCompanyData] = useState<CompanyData[]>([
        {
            key: '1',
            company: 'Company A',
            address: '123 Main St',
            country: 'USA',
            state: 'New York State',
            city: 'broklyn',
            zip: "8663453",
        },
        {
            key: '2',
            company: 'Company B',
            address: '456 Oak Ave',
            country: 'USA',
            state: 'Ohio State',
            city: 'ohio city',
            zip: "7667408",
        }
    ]);
    const [deletedUsers, setDeletedUsers] = useState<UserData[]>([]);
    const [isRecoverModalVisible, setIsRecoverModalVisible] = useState(false);
    const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);
    const [checkedCells, setCheckedCells] = useState<Record<string, Record<string, boolean>>>({});
    const [permissions, setPermissions] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        company: "",
        hq: false,
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        icon: null,
    });
    const [form] = Form.useForm();

    const data = useMemo(
        () => [
            { key: "1", module: "Users" },
            { key: "2", module: "Budgets" },
            { key: "3", module: "Managers" },
        ],
        []
    );

    const commonColumns = (title: string, dataIndex: string, sorter?: (a: any, b: any) => number) => ({
        title,
        dataIndex,
        key: dataIndex,
        sorter,
    });

    const actionColumn = (handleEdit: (record: any) => void) => ({
        title: "Actions",
        key: "actions",
        render: (_: any, record: any) => (
            <Tooltip
                color={bgColor}
                placement="leftBottom"
                className="custom-tooltip"
                title={
                    <div className="menu-options">
                        <div className="menu-item" role="button" onClick={() => handleEdit(record)}>
                            <EditOutlined className="edit-icon" />
                            <div>Edit item</div>
                        </div>
                    </div>
                }>
                <div className="action-menu">
                    <span className="three-dot-menu">•••</span>
                </div>
            </Tooltip>
        ),
    });

    const userColumns = [
        commonColumns("Display Name", "name", (a: UserData, b: UserData) => a.name.localeCompare(b.name)),
        commonColumns("User Name", "username", (a: UserData, b: UserData) => a.username.localeCompare(b.username)),
        commonColumns("Role", "role", (a: UserData, b: UserData) => a.role.localeCompare(b.role)),
        commonColumns("Password", "password", (a: UserData, b: UserData) => a.password.localeCompare(b.password)),
        actionColumn((record) => handleEdit(record))
    ];

    const roleColumns = [
        commonColumns("Role Name", "roleName", (a: RoleData, b: RoleData) => a.roleName.localeCompare(b.roleName)),
        commonColumns("Permissions", "permissions", (a: RoleData, b: RoleData) => a.permissions.localeCompare(b.permissions)),
        actionColumn((record) => handleEdit(record))
    ];

    const companyColumns = [
        commonColumns('Supplier Name', 'company', (a: CompanyData, b: CompanyData) => a.company.localeCompare(b.company)),
        commonColumns('Address', 'address'),
        commonColumns('Country', 'country'),
        commonColumns('State', 'state'),
        commonColumns('City', 'city'),
        commonColumns('Zip', 'zip'),
        actionColumn((record) => handleEdit(record))
    ];

    const formColumns = [
        { title: "Module", dataIndex: "module", key: "module" },
        ...["Create", "View", "Edit", "Cancel"].map((col) => ({
            title: col,
            dataIndex: col.toLowerCase(),
            key: col.toLowerCase(),
            render: (_: any, record: any) => (
                <Checkbox
                    checked={checkedCells[record.key]?.[col.toLowerCase()] || false}
                    onChange={(e) => handleCellCheck(record.key, col.toLowerCase(), e.target.checked)}
                />
            ),
        })),
    ];

    useEffect(() => {
        setRoleDataOption(roleData.map((role) => ({ value: role.key, label: role.roleName })));
    }, [roleData]);

    useEffect(() => {
        const allChecked = data?.every((row) => (
            checkedCells[row.key]?.create &&
            checkedCells[row.key]?.view &&
            checkedCells[row.key]?.edit &&
            checkedCells[row.key]?.cancel
        ));
        setCheckAll(allChecked);
    }, [checkedCells, data]);

    const handleCellCheck = (rowKey: string, colKey: string, checked: boolean) => {
        setCheckedCells(prev => ({
            ...prev,
            [rowKey]: { ...prev[rowKey], [colKey]: checked }
        }));

        const permissionSet = new Set<string>((form.getFieldValue('permissions') || '').split(', ').filter(Boolean));
        checked ? permissionSet.add(colKey) : permissionSet.delete(colKey);
        form.setFieldsValue({ permissions: Array.from(permissionSet).join(', ') });
    };

    const handleCheckAll = (e: any) => {
        const isChecked = e.target.checked;
        setCheckAll(isChecked);

        const newCheckedCells = data.reduce((acc, row) => ({
            ...acc,
            [row.key]: { create: isChecked, view: isChecked, edit: isChecked, cancel: isChecked }
        }), {});

        setCheckedCells(newCheckedCells);
        form.setFieldsValue({ permissions: isChecked ? 'All Access' : '' });
    };
    const handleTransactionAdmin = (e: any) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setPermissions('Read Only');
        } else {
            setPermissions('');
        }
    };

    const handleSystemAdmin = (e: any) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setPermissions('Create, View, Edit & Cancel');
        } else {
            setPermissions('');
        }
    };


    const handleCheckboxChange = (e: any) => {
        setAutoGeneratePassword(e.target.checked);
    };

    const handleChildClick = (key: string) => {
        setActiveChild(key);
        if (key === 'addUser' || key === 'addRole' || key === 'addCompany') {
            setIsUserDrawerVisible(true);
        } else {
            setIsUserDrawerVisible(false);
        }

    };

    const handleRowSelectionChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: handleRowSelectionChange,
    };

    const handleAddUser = () => {
        form
            .validateFields()
            .then(values => {
                const newUser = {
                    key: values.username,
                    firstname: values.firstname,
                    username: values.username,
                    name: values.name,
                    lastname: values.lastname,
                    role: values.role,
                    password: values.password,
                };

                if (editSelectedKey) {
                    const updatedUserData = userData.map((user) =>
                        user.key === editSelectedKey ? newUser : user
                    );
                    setUserData(updatedUserData);
                    message.success('User updated successfully!');
                } else {
                    setUserData([...userData, newUser]);
                    message.success('User added successfully!');
                }
                setIsUserDrawerVisible(false);
                form.resetFields();
                setEditSelectedKey('');
                if (activeChild === 'addUser') setActiveChild('userList');
            })
            .catch(err => {
                console.error('Validation failed:', err);
            });
    };

    const handleAddRole = () => {
        form
            .validateFields()
            .then((values) => {
                const newRole = {
                    key: values.roleName.toLowerCase().replace(/\s+/g, ''),
                    roleName: values.roleName,
                    description: values.description,
                    permissions: checkAll ? 'All Access' : permissions,
                };

                if (editSelectedKey) {
                    const updatedRoleData = roleData.map((role) =>
                        role.key === editSelectedKey ? newRole : role
                    );
                    setRoleData(updatedRoleData);
                    message.success('Role updated successfully!');
                } else {
                    setRoleData([...roleData, newRole]);
                    message.success('Role added successfully!');
                }

                setIsUserDrawerVisible(false);
                form.resetFields();
                setPermissions('');
                setCheckAll(false);
                if (activeChild === 'addRole') setActiveChild('roleList');
            })
            .catch((err) => console.error('Validation failed:', err));
    };

    const handleSubmit = () => {
        if (editSelectedCompany) {
            const updatedCompanies = companyData.map(company =>
                company.key === editSelectedCompany ? {
                    ...company,
                    ...formData,
                    key: editSelectedCompany
                } : company
            );
            setCompanyData(updatedCompanies);
            message.success('Company updated successfully!');
        } else {
            const newCompany = {
                ...formData,
                key: Date.now().toString()
            };
            setCompanyData([...companyData, newCompany]);
            message.success('Company added successfully!');
        }

        setFormData({
            company: "",
            hq: false,
            address: "",
            country: "",
            state: "",
            city: "",
            zip: "",
            icon: null,
        });
        setEditSelectedCompany(null);
        handleClose();
    };

    const handleEdit = (record: any) => {
        setEditSelectedKey(record?.key);

        if (activeChild === 'Supplier List' || activeChild === 'addCompany') {
            setFormData({
                company: record.company,
                hq: record.hq || false,
                address: record.address,
                country: record.country,
                state: record.state,
                city: record.city,
                zip: record.zip,
                icon: record.icon || null,
            });
            setEditSelectedCompany(record.key);
        }
        else if (activeChild === 'userList' || activeChild === 'addUser') {
            form.setFieldsValue({
                firstname: record.firstname,
                lastname: record.lastname,
                name: record.name,
                username: record.username,
                role: record.role,
                password: record.password,
            });
        }
        else if (activeChild === 'roleList' || activeChild === 'addRole') {
            const isAllAccess = record.permissions === 'All Access';
            form.setFieldsValue({
                roleName: record.roleName,
                description: record.description,
                permissions: checkAll ? 'All Access' : record.permissions,
            });
            setCheckAll(isAllAccess);
            setPermissions(record.permissions);
        }

        setIsUserDrawerVisible(true);
    };

    const handleClose = () => {
        form.resetFields();
        setIsUserDrawerVisible(false);
        setEditSelectedKey('');
        setEditSelectedCompany(null);
        setFormData({
            company: "",
            hq: false,
            address: "",
            country: "",
            state: "",
            city: "",
            zip: "",
            icon: null,
        });

        if (activeChild === 'addUser') setActiveChild('userList');
        if (activeChild === 'addCompany') setActiveChild('Supplier List');
        if (activeChild === 'addRole') setActiveChild('roleList');
    };


    const handleDeleteUser = () => {
        const usersToDelete = userData.filter((user) => selectedRowKeys.includes(user.key));
        const remainingUsers = userData.filter((user) => !selectedRowKeys.includes(user.key));
        setDeletedUsers([...deletedUsers, ...usersToDelete]);
        setUserData(remainingUsers);
        setSelectedRowKeys([]);
        setIsDeleteModalVisible(false);
    };

    const handleDeleteRole = () => {
        const rolesToDelete = roleData.filter((role) => selectedRowKeys.includes(role.key));
        const remainingRoles = roleData.filter((role) => !selectedRowKeys.includes(role.key));

        setDeletedRoles([...deletedRoles, ...rolesToDelete]);
        setRoleData(remainingRoles);
        setSelectedRowKeys([]);
        setIsDeleteModalVisible(false);
    };

    const handleRecoverUsers = () => {
        const usersToRecover = deletedUsers.filter((user) => selectedRowKeys.includes(user.key));
        const remainingDeletedUsers = deletedUsers.filter((user) => !selectedRowKeys.includes(user.key));

        setUserData([...userData, ...usersToRecover]);
        setDeletedUsers(remainingDeletedUsers);
        setSelectedRowKeys([]);
        setIsRecoverModalVisible(false);
    };

    const handleRecoverRoles = () => {
        const rolesToRecover = deletedRoles.filter((role) => selectedRowKeys.includes(role.key));
        const remainingDeletedRoles = deletedRoles.filter((role) => !selectedRowKeys.includes(role.key));

        setRoleData([...roleData, ...rolesToRecover]);
        setDeletedRoles(remainingDeletedRoles);
        setSelectedRowKeys([]);
        setIsRecoverModalVisible(false);
    };

    const handleChangePassword = () => {
        form
            .validateFields(['currentPassword', 'newPassword', 'confirmPassword'])
            .then(values => {
                if (values.newPassword !== values.confirmPassword) {
                    message.error('New passwords do not match!');
                    return;
                }

                message.success('Password changed successfully!');
                form.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
            })
            .catch(error => {
                console.error('Password change failed:', error);
                message.error('Failed to change password. Please check your inputs.');
            });
    };

    const handleDeleteCompany = () => {
        const companiesToDelete = companyData.filter((company) =>
            selectedRowKeys.includes(company.key)
        );
        const remainingCompanies = companyData.filter((company) =>
            !selectedRowKeys.includes(company.key)
        );

        setDeletedCompanies([...deletedCompanies, ...companiesToDelete]);
        setCompanyData(remainingCompanies);
        setSelectedRowKeys([]);
        setIsDeleteModalVisible(false);
    };

    const handleRecoverCompanies = () => {
        const companiesToRecover = deletedCompanies.filter((company) =>
            selectedRowKeys.includes(company.key)
        );
        const remainingDeletedCompanies = deletedCompanies.filter((company) =>
            !selectedRowKeys.includes(company.key)
        );

        setCompanyData([...companyData, ...companiesToRecover]);
        setDeletedCompanies(remainingDeletedCompanies);
        setSelectedRowKeys([]);
        setIsRecoverModalVisible(false);
    };

    const content = () => {
        let renderedContent;

        if (activeChild === 'Supplier List' || activeChild === 'addCompany') {
            renderedContent = (
                <CreateCompanyForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                />
            );
        } else if (activeChild === 'userList' || activeChild === 'addUser') {
            renderedContent = (
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstname"
                                label="First Name"
                                rules={[{ required: true, message: 'Please enter a First name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastname"
                                label="Last Name"
                                rules={[{ required: true, message: 'Please enter a Last Name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="name"
                        label="Display Name"
                        rules={[{ required: true, message: 'Please enter a Display name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[{ required: true, message: 'Please enter a username' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[{ required: true, message: 'Please enter a role' }]}
                            >
                                <SelectDropDown options={roleDataOption} />
                            </Form.Item>
                        </Col>
                    </Row>

                    {!autoGeneratePassword && (
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: 'Please enter a password' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    )}
                    <Form.Item name="checkpass">
                        <Checkbox onChange={handleCheckboxChange} checked={autoGeneratePassword}>
                            Automatically create a password
                        </Checkbox>
                    </Form.Item>
                </Form>
            );
        } else {
            renderedContent = (
                <Form form={form} layout="vertical" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Form.Item
                        name="roleName"
                        label={<span>Name</span>}
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item name="description" label={<span>Description</span>}>
                        <Input placeholder="Enter description" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="permissions" label="Transaction Admin">
                                <Checkbox
                                    checked={permissions === 'Read Only'}
                                    onChange={handleTransactionAdmin}
                                >
                                    Visibility for all transactions
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="permissions" label="System Admin">
                                <Checkbox
                                    checked={permissions === 'Create, View, Edit & Cancel'}
                                    onChange={handleSystemAdmin}
                                >
                                    Org Settings - Create, View, Edit & Cancel Accesses
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="permissions">
                        <Checkbox checked={checkAll} onChange={(e) => handleCheckAll(e)}>
                            Check All Roles
                        </Checkbox>
                    </Form.Item>
                    <Table
                        columns={formColumns}
                        dataSource={data}
                        pagination={false}
                        style={{ marginTop: '20px' }}
                        bordered
                    />
                </Form>
            );
        }

        return <div className="custom-cont">{renderedContent}</div>;
    };

    const footer = () => {
        return (
            <div className="footer">
                <Button type="primary" onClick={activeChild === 'userList' || activeChild === 'addUser' ? handleAddUser : activeChild === 'Supplier List' || activeChild === 'addCompany' ? handleSubmit : handleAddRole}>
                    {editSelectedKey ? (activeChild === 'userList' || activeChild === 'addUser' ? 'Update User' : activeChild === 'Supplier List' || activeChild === 'addCompany' ? "Update Company" : 'Update Role') : (activeChild === 'userList' ? 'Add User' : activeChild === 'Supplier List' || activeChild === 'addCompany' ? "Add Company" : 'Add Role')}
                </Button>
                <Button onClick={handleClose} type="primary">
                    Close
                </Button>
            </div>
        );
    };

    const renderContent = () => {
        if (activeChild === 'userList') {
            return (
                <div>
                    <CustomTable
                        title="User List"
                        columns={userColumns}
                        data={userData}
                        bordered={false}
                        pagination={true}
                        setIsDrawerVisible={setIsUserDrawerVisible}
                        rowSelection={rowSelection}
                        setIsDeleteModalVisible={setIsDeleteModalVisible}
                        activeChild={activeChild}
                        placeholder={"Search User List..."}
                        containerClass={"cointainer-table"}

                    />
                </div>
            );
        } else if (activeChild === 'deletedUsers') {
            return <div>
                <CustomTable
                    title="Deleted Users"
                    columns={userColumns}
                    data={deletedUsers}
                    bordered={false}
                    setIsRecoverModalVisible={setIsRecoverModalVisible}
                    pagination={true}
                    rowSelection={rowSelection}
                    activeChild={activeChild}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    placeholder={"Search Deleted User List..."}
                    containerClass={"cointainer-table"}

                />
            </div>
        } else if (activeChild === 'roleList') {
            return (
                <CustomTable
                    title="Role List"
                    columns={roleColumns}
                    data={roleData}
                    pagination={true}
                    activeChild={activeChild}
                    rowSelection={rowSelection}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    setIsDrawerVisible={setIsUserDrawerVisible}
                    placeholder={"Search Role List..."}
                    containerClass={"cointainer-table"}

                />
            )
        } else if (activeChild === 'deletedRole') {
            return (
                <CustomTable
                    title="Deleted Roles"
                    columns={roleColumns}
                    data={deletedRoles}
                    pagination={true}
                    activeChild={activeChild}
                    rowSelection={rowSelection}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    setIsRecoverModalVisible={setIsRecoverModalVisible}
                    placeholder={"Search Deleted Roles List..."}
                    containerClass={"cointainer-table"}
                />
            )
        } else if (activeChild === 'settings') {
            return (
                <Form form={form} layout="vertical" className="password-form">
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm New Password"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                </Form>
            )
        } else if (activeChild === 'Supplier List') {
            return (
                <CustomTable
                    title="Supplier List"
                    columns={companyColumns}
                    data={companyData}
                    bordered={false}
                    pagination={true}
                    setIsDrawerVisible={setIsUserDrawerVisible}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    rowSelection={rowSelection}
                    activeChild={activeChild}
                    placeholder="Search Supplier List..."
                    containerClass="cointainer-table"
                />
            )
        } else if (activeChild === 'date time format') {
            return (
                <DateTimeFormat />
            )
        } else if (activeChild === 'Deleted Supplier') {
            return (
                <CustomTable
                    title="Deleted Companies"
                    columns={companyColumns}
                    data={deletedCompanies}
                    bordered={false}
                    pagination={true}
                    rowSelection={rowSelection}
                    activeChild={activeChild}
                    setIsRecoverModalVisible={setIsRecoverModalVisible}
                    placeholder="Search Deleted Supplier..."
                    containerClass="cointainer-table"
                />
            )
        } else if (activeChild === 'Email') {
            return (

                <EmailForm setTlsSwitch={setTlsSwitch} tlsSwitch={tlsSwitch} />
            );
        }
    };

    return (
        <div className="user-main">
            <div className="user-container">
                <div className="user-first-box">
                    <Card title="Users" bordered>
                        <Collapse defaultActiveKey={['userList', 'addRole']} accordion expandIconPosition='end'>
                            <Panel header={
                                <>
                                    <UserOutlined className='header-icon' /> User
                                </>
                            } key="userList">
                                <List
                                    dataSource={[
                                        { key: 'userList', name: 'User List' },
                                        { key: 'addUser', name: 'Add User' },
                                        { key: 'deletedUsers', name: 'Deleted Users' },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.key}
                                            onClick={() => {
                                                handleChildClick(item.key);
                                            }}
                                            className={`category-item ${activeChild === item.key ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                            <Panel header={
                                <>
                                    <UserSwitchOutlined className='header-icon' /> Role
                                </>
                            }
                                key="addRole">
                                <List
                                    dataSource={[
                                        { key: 'roleList', name: 'Role List' },
                                        { key: 'addRole', name: 'Add Role' },
                                        { key: 'deletedRole', name: 'Deleted Role' },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.key}
                                            onClick={() => handleChildClick(item.key)}
                                            className={`category-item ${activeChild === item.key ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </List.Item>
                                    )}
                                />
                            </Panel>

                            <Panel header={
                                <>
                                    <SettingOutlined className='header-icon' /> Settings
                                </>
                            }
                                key="settings">
                                <List
                                    dataSource={[
                                        { key: 'date time format', name: 'Date Format' },
                                        { key: 'Email', name: 'Email' },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.key}
                                            onClick={() => handleChildClick(item.key)}
                                            className={`category-item ${activeChild === item.key ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                            <Panel header={
                                <>
                                    <ShopOutlined className='header-icon' /> Supplier
                                </>
                            }
                                key="company">
                                <List
                                    dataSource={[
                                        { key: 'Supplier List', name: 'Supplier List' },
                                        { key: 'addCompany', name: 'Add Supplier' },
                                        { key: 'Deleted Supplier', name: 'Deleted Supplier' },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.key}
                                            onClick={() => handleChildClick(item.key)}
                                            className={`category-item ${activeChild === item.key ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </List.Item>
                                    )}
                                />
                            </Panel>

                        </Collapse>
                    </Card>
                </div>

                <div className={!['addUser', 'addCompany', 'addRole'].includes(activeChild) ? "user-second-box" : 'none-box'}>
                    <Card
                        title={activeChild.charAt(0).toUpperCase() + activeChild.slice(1)}
                        bordered
                    >
                        {!['addUser', 'addCompany', 'addRole'].includes(activeChild) && renderContent()}
                    </Card>
                </div>
            </div>

            <CustomDrawer
                title={
                    editSelectedKey
                        ? (activeChild === 'Supplier List' || activeChild === 'addCompany'
                            ? "Edit Company"
                            : activeChild === 'userList' || activeChild === 'addUser'
                                ? "Edit User"
                                : "Edit Role")
                        : (activeChild === 'Supplier List' || activeChild === 'addCompany'
                            ? "Add Company"
                            : activeChild === 'userList'
                                ? "Add User"
                                : "Add Role")
                }
                placement="right"
                onClose={handleClose}
                visible={isUserDrawerVisible}
                width={800}
                footer={footer()}
                content={content()}
            />

            <Modal
                title="Confirm Deletion"
                visible={isDeleteModalVisible}
                onOk={
                    activeChild === 'userList' ? handleDeleteUser :
                        activeChild === 'roleList' ? handleDeleteRole :
                            activeChild === 'Supplier List' ? handleDeleteCompany : () => { }
                }
                onCancel={() => setIsDeleteModalVisible(false)}
            >
                {activeChild === 'userList' ?
                    <p>Are you sure you want to delete the selected User?</p> :
                    activeChild === 'roleList' ?
                        <p>Are you sure you want to delete the selected Role?</p> :
                        <p>Are you sure you want to delete the selected Company?</p>}
            </Modal>

            <Modal
                title="Confirm Recovery"
                visible={isRecoverModalVisible}
                onOk={
                    activeChild === 'deletedUsers' ? handleRecoverUsers :
                        activeChild === 'deletedRole' ? handleRecoverRoles :
                            activeChild === 'Deleted Supplier' ? handleRecoverCompanies : () => { }
                }
                onCancel={() => setIsRecoverModalVisible(false)}
            >
                {activeChild === 'deletedUsers' ?
                    <p>Are you sure you want to recover the selected User?</p> :
                    activeChild === 'deletedRole' ?
                        <p>Are you sure you want to recover the selected Role?</p> :
                        <p>Are you sure you want to recover the selected Company?</p>}
            </Modal>

            <Modal
                title="Confirm Deletion"
                visible={isDeleteConfirmationVisible}
                onOk={() => {
                    if (userToDelete) {
                        const updatedUserData = userData.filter((user) => user.key !== userToDelete.key);
                        setUserData(updatedUserData);
                        message.success('User deleted successfully!');
                    }
                    setIsDeleteConfirmationVisible(false);
                    setUserToDelete(null);
                }}
                onCancel={() => {
                    setIsDeleteConfirmationVisible(false);
                    setUserToDelete(null);
                }}
            >
                <p>Are you sure you want to delete the user <strong>{userToDelete?.name}</strong>?</p>
            </Modal>
        </div>
    );
};

export default UserCreation;
