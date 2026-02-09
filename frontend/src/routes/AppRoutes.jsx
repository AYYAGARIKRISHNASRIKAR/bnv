import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ListUsers from '../pages/ListUsers';
import AddEditUser from '../pages/AddEditUser';
import ViewUser from '../pages/ViewUser';

const AppRoutes = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<ListUsers />} />
          <Route path="/add-user" element={<AddEditUser />} />
          <Route path="/edit-user/:id" element={<AddEditUser />} />
          <Route path="/view-user/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default AppRoutes;