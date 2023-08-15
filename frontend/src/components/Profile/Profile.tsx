import React from 'react';
import { UserProfile } from '../../hooks/login/useLogin';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>User Name: {user.user_name}</p>
    </div>
  );
};

export default Profile;
