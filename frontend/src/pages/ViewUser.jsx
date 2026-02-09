import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import UserCard from '../components/UserCard';
import { userAPI } from '../services/api';

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = React.useCallback(async () => {
    try {
      const response = await userAPI.getUserById(id);
      setUser(response.data);
    } catch {
      message.error('Failed to fetch user details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <UserCard user={user} onBack={handleBack} />
    </div>
  );
};

export default ViewUser;