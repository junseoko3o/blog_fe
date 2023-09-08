import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import styles from './lib/signUp.module.css'
import melody from './lib/melody.png';
import useSignUp from 'hooks/useUser/signUp';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const SignUpForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handledSignUp,
    confirmPassword,
    setConfirmPassword,
    validatePassword,
    backLogin,
  } = useSignUp();

  return (
    <div className={styles.container}>
    <Row justify="center" align="middle">
      <Col span={8}>
        <img src={melody} alt="" className={styles.image} />
        <h1 className={styles.title}>SignUp</h1>
        <Form className={styles.layout} onFinish={handledSignUp} {...layout}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter a valid email address.',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address.',
              },
            ]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter your name.',
              },
            ]}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password.',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters long.',
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="ConfirmPw"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please re-enter your password.',
              },
              {
                validator: validatePassword,
                message: 'Passwords do not match.',
              },
            ]}
          >
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
          <div className={styles.buttonContainer}>
            <Button type="primary" htmlType="submit" className={styles.signUpButton}>
              SignUp
            </Button>
            <Button type="primary" htmlType="submit" className={styles.backButton} onClick={backLogin}>
              Back
            </Button>
          </div>
          </Form.Item>
        </Form>
        </Col>
    </Row>
    </div>
  );
}

export default SignUpForm;
