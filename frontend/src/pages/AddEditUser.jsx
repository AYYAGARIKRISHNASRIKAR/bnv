import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, message, Spin } from 'antd';
import UserForm from '../components/UserForm';
import { userAPI } from '../services/api';

const AddEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await userAPI.getUserById(id);
        setInitialValues(response.data);
      } catch {
        message.error('Failed to fetch user details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      setIsEdit(true);
      fetchUser();
    }
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (isEdit) {
        await userAPI.updateUser(id, formData);
        message.success('User updated successfully');
      } else {
        await userAPI.createUser(formData);
        message.success('User created successfully');
      }
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Operation failed';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card
        title={isEdit ? 'Edit User' : 'Add New User'}
        className="max-w-4xl mx-auto"
      >
        <UserForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          isEdit={isEdit}
        />
      </Card>
    </div>
  );
};

export default AddEditUser;