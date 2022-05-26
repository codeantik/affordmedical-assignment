
import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate();

    const register = async (data) => {
        console.log(data);
        const response = await axios.post('http://localhost:5000/register', data);
        console.log(response);
        navigate('/login');
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        register(values);

    };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
      return (
        <div className="register">
        <h1>Register</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
            ]}
          >
            <Input/>
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
}       