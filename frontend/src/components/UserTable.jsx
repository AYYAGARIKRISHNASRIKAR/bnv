import React from 'react';
import { Table, Avatar, Tag, Button, Space, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const API_BASE = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

const UserTable = ({
  users,
  loading,
  onView,
  onEdit,
  onDelete,
  currentPage,
  total,
  onPageChange,
  pageSize
}) => {
  const columns = [
    {
      title: 'ID',
      render: (_, __, index) => (
        <span className="text-xs text-gray-500">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: 'Full Name',
      key: 'fullName',
      render: (_, record) => (
        <Space>
          <Avatar
            src={record.profileImage ? `${API_BASE}${record.profileImage}` : null}
            size="small"
            style={{ backgroundColor: '#1890ff' }}
          >
            {record.firstName?.[0]?.toUpperCase()}
          </Avatar>
          <span>{record.firstName} {record.lastName}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="_id"
      pagination={{
        current: currentPage,
        total,
        pageSize,
        onChange: onPageChange,
        showSizeChanger: false,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} users`,
      }}
      scroll={{ x: 800 }}
    />
  );
};

export default UserTable;
