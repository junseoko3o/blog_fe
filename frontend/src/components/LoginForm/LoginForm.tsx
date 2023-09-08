import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import logo from './lib/kuromi.svg'
import styles from './lib/login.module.css';
import useLogin from 'hooks/useUser/login/useLogin';

const { Title } = Typography;
const layout = {
  labelCol: { span: 4 }, 
  wrapperCol: { span: 18 },
};

const LoginForm = () => {
  const { handledLogin, signUp } = useLogin();
  const [loading, setLoading] = useState(false);

  return (
    <>
    <div className={styles.container}>
      <Row justify="center" align="middle">
        <Col span={8} className={styles.col}>
          <img src={logo} alt="" className={styles.image} />
          <Title level={2} className={styles.title}>Login</Title>
        <Form name="login" onFinish={handledLogin} {...layout}>
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
              <div className={styles.buttonContainer}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className={styles.loginButton}
                >
                  Login
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={signUp}
                  className={styles.signUpButton}
                >
                  SignUp
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default LoginForm;
