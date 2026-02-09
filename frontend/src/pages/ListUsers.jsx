import React, { useState, useEffect } from 'react';
import { Input, Button, Space, message, Select, Spin, Empty } from 'antd';
import { SearchOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import { userAPI } from '../services/api';

const { Search } = Input;
const { Option } = Select;

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searching, setSearching] = useState(false);
  
  const navigate = useNavigate();
  const pageSize = 10;

  const fetchUsers = async (page = 1, query = '', status = '') => {
    setLoading(true);
    try {
      let response;
      if (query) {
        response = await userAPI.searchUsers(query, page, pageSize);
        setSearching(true);
      } else {
        response = await userAPI.getUsers(page, pageSize);
        setSearching(false);
      }

      let filteredUsers = response.data.data;
      if (status) {
        filteredUsers = filteredUsers.filter(user => user.status === status);
      }

      setUsers(filteredUsers);
      setTotalUsers(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error) {
      message.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
    fetchUsers(1, value, statusFilter);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
    fetchUsers(1, searchQuery, value);
  };

  const handlePageChange = (page) => {
    fetchUsers(page, searchQuery, statusFilter);
  };

  const handleView = (user) => {
    navigate(`/view-user/${user._id}`);
  };

  const handleEdit = (user) => {
    navigate(`/edit-user/${user._id}`);
  };

  const handleDelete = async (userId) => {
    try {
      await userAPI.deleteUser(userId);
      message.success('User deleted successfully');
      fetchUsers(currentPage, searchQuery, statusFilter);
    } catch (error) {
      message.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await userAPI.exportToCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      message.success('Users exported successfully');
    } catch (error) {
      message.error('Failed to export users');
      console.error('Error exporting users:', error);
    }
  };

  const filteredTotal = statusFilter ? 
    users.filter(user => user.status === statusFilter).length : 
    totalUsers;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Search
              placeholder="Search users by name or email..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              placeholder="Filter by Status"
              allowClear
              style={{ width: 150 }}
              onChange={handleStatusFilter}
              value={statusFilter || undefined}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
            
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/add-user')}
            >
              Add User
            </Button>
            
            <Button
              icon={<ExportOutlined />}
              onClick={handleExportCSV}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {searching && (
          <div className="mb-2">
            <span className="text-gray-600">
              Search results for: <strong>"{searchQuery}"</strong>
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : users.length === 0 ? (
        <Empty 
          description="No users found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <UserTable
          users={users}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          total={filteredTotal}
          onPageChange={handlePageChange}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default ListUsers;