import React from 'react';
import { Card, Avatar, Tag, Button, Space, Descriptions } from 'antd';
import { ArrowLeftOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const UserCard = ({ user, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={onBack}
        className="mb-4"
      >
        Back to List
      </Button>

      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Avatar
              size={120}
              src={user.profileImage ? `https://bnv-zscq.onrender.com${user.profileImage}` : null}
              style={{ backgroundColor: '#1890ff' }}
            >
              {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
            </Avatar>
            <Tag 
              color={user.status === 'Active' ? 'green' : 'red'} 
              className="mt-3"
            >
              {user.status}
            </Tag>
          </div>

          <div className="flex-1">
            <Descriptions
              title={`${user.firstName} ${user.lastName}`}
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Email">
                <Space>
                  <MailOutlined />
                  {user.email}
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label="Phone">
                <Space>
                  <PhoneOutlined />
                  {user.phone}
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label="Gender">
                {user.gender}
              </Descriptions.Item>
              
              <Descriptions.Item label="Location">
                {user.location || 'Not specified'}
              </Descriptions.Item>
              
              <Descriptions.Item label="User ID">
                <span className="text-xs text-gray-500">{user._id}</span>
              </Descriptions.Item>
              
              <Descriptions.Item label="Joined">
                {new Date(user.createdAt).toLocaleDateString()}
              </Descriptions.Item>
              
              <Descriptions.Item label="Last Updated">
                {new Date(user.updatedAt).toLocaleDateString()}
              </Descriptions.Item>
              
              {user.profileImage && (
                <Descriptions.Item label="Profile Image" span={2}>
                  <a 
                    href={`http://localhost:5000${user.profileImage}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Full Image
                  </a>
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
