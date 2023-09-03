import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import useLogin from 'hooks/login/useLogin';
import logo from './lib/kuromi.svg'
import styles from './lib/login.module.css';

const { Title } = Typography;
const layout = {
  labelCol: { span: 4 }, 
  wrapperCol: { span: 18 },
};

const LoginForm = () => {
  const { login } = useLogin();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string, password: string }) => {
    const { email, password } = values;
    setLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      alert('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col span={8} className={styles.col}>
        <img src={logo} alt="" className={styles.image} />
        <Title level={2} className={styles.title}>Login</Title>
      <Form name="login" onFinish={onFinish} {...layout}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email address',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]} 
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={styles.loginButton}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
