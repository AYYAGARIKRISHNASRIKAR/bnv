import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserForm = ({
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
  isEdit = false
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
    const newFileList = initialValues.profileImage ? [
      {
        uid: '-1',
        name: 'profile-image',
        status: 'done',
        url: `http://localhost:5000${initialValues.profileImage}`,
      },
    ] : [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFileList(newFileList);
  }, [initialValues, form]);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('profileImage', fileList[0].originFileObj);
    }

    try {
      await onSubmit(formData);
      if (!isEdit) {
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input last name!' }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>
      </div>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input phone number!' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Status"
          name="status"
          initialValue="Active"
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
        >
          <Input placeholder="Enter location" />
        </Form.Item>
      </div>

      <Form.Item
        label="Profile Image"
        name="profileImage"
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={handleBeforeUpload}
          onChange={handleChange}
          maxCount={1}
          customRequest={({ onSuccess }) => onSuccess('ok')}
        >
          {fileList.length >= 1 ? null : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item className="mb-0">
        <div className="flex gap-2 justify-end">
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {isEdit ? 'Update User' : 'Create User'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UserForm;