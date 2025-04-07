import React, { useState } from 'react';
import { Button, Form, Input, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './UserManagement.scss';
import CustomTable from '../../component/table/CustomTable';
import CustomButton from '../../component/buttons/CustomButton';
import CustomModal from '../../component/popup/CustomModel';

interface User {
    key: string;
    name: string;
    email: string;
    role: string;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        { key: '1', name: 'vanaraj', email: 'vanaraj@123.com', role: 'Admin' },
        { key: '2', name: 'Smith willson', email: 'willson.333@outlook.com', role: 'Super Admin' },
        { key: '3', name: 'Michael Mohan', email: 'michael.Mohan@gmail.com', role: 'User' },
        { key: '4', name: 'Raj M', email: 'raj.m1234@gmail.com', role: 'Supplier' },

    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [form] = Form.useForm();

    const handleAddUser = () => {
        setIsModalVisible(true);
        setCurrentUser(null);
        form.resetFields();
    };

    const handleEditUser = (record: User) => {
        setIsModalVisible(true);
        setCurrentUser(record);
        form.setFieldsValue(record);
    };

    const handleDeleteUser = (key: string) => {
        setUsers(users.filter(user => user.key !== key));
    };

    const handleModalSubmit = () => {
        form.validateFields()
            .then(values => {
                if (currentUser) {
                    setUsers(users.map(user => (user.key === currentUser.key ? { ...user, ...values } : user)));
                } else {
                    const newUser: User = { key: String(users.length + 1), ...values };
                    setUsers([...users, newUser]);
                }
                setIsModalVisible(false);
            })
            .catch(error => {
                console.error("Error in form validation", error);
            });

    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Email', dataIndex: 'email', key: 'email', sorter: (a: any, b: any) => a.email.localeCompare(b.email) },
        { title: 'Role', dataIndex: 'role', key: 'role', sorter: (a: any, b: any) => a.role.localeCompare(b.role) },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User) => (
                <Space>
                    <CustomButton label='Edit' icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={() => handleDeleteUser(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const content = () => {
        return (
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter the user name' }]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter the email address' },
                        { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please enter the role' }]}
                >
                    <Input placeholder="Enter role" />
                </Form.Item>
            </Form>
        )
    }

    return (
        <div className="user-management">
            <div className="header">
                <div className="header-title">User Management</div>
                <CustomButton label='Add User' type="primary" icon={<PlusOutlined />} onClick={handleAddUser} />
            </div>
            <CustomTable title='Total Users'
                columns={columns}
                data={users}
                pagination={true}
            />
            <CustomModal
                visible={isModalVisible}
                title={currentUser ? 'Edit User' : 'Add User'}
                onOk={handleModalSubmit}
                onCancel={() => setIsModalVisible(false)}
                onClose={() => setIsModalVisible(false)}
                content={content()}
                closable={true}
                className='modal-here'
            />
        </div>
    );
};

export default UserManagement;
