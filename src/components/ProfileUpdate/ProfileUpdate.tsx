import usePasswordCheck from "hooks/useUser/passwordCheck/usePasswordCheck";
import { Input, Button, message, Form } from 'antd';
import useProfileUpdate from "hooks/useUser/profileUpdate/useProfileUpdate";
import styles from './lib/profileUpdate.module.css';
import cinnamoroll from './lib/Cinnamoroll.png';
import kitty from './lib/kitty.png';


const { Password } = Input;

const ProfileUpdate = () => {
   const { user, currentPassword, setCurrentPassword, isInputEnabled, setInputEnabled, checkPassword } = usePasswordCheck();
   const { password, setPassword, confirmPassword, setConfirmPassword, handledUserUpdate, cancelUpdate, validatePassword } = useProfileUpdate();

   const handlePasswordCheck = async () => {
    try {
      const response = await checkPassword(currentPassword);
      if (response) {
        setInputEnabled(true);
      }
    } catch (err) {
      message.error('누구여');
    }
  };

return (
  <>
  <div>
    <h2>Name <br></br>{user.user_name}</h2>
  </div>
  {isInputEnabled ? (
    <>
      <img src={kitty} className={styles.image}/>
      <Form onFinish={handledUserUpdate}>
      {/* <div className={styles.inputContainer}>
        <Input
          placeholder="input new name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div> */}
      <div className={styles.passwordContainer}>
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
        </div>
        <div className={styles.passwordCheckContainer}>
          <Form.Item
            label="Confirm"
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
      </div>
        <Button type="primary" onClick={handledUserUpdate} className={styles.updateButton}>
          Update
        </Button>
        <Button type="primary" onClick={cancelUpdate} className={styles.cancelButton}>
          Cancel
        </Button>
      </Form>
    </>
  ) : (
    <>
      <Form onFinish={handlePasswordCheck}>
        <img src={cinnamoroll} className={styles.image}/>
        <div className={styles.passwordConfirmContainer}>
          <Password
            placeholder="input current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={handlePasswordCheck} className={styles.passwordCheckButton}>
          Password Check
        </Button>
      </Form>
    </>
  )}
</>
  );
}

export default ProfileUpdate;