export interface UserProfile {
  id: number;
  user_email: string;
  user_name: string;
  access_token?: string;
  refresh_token?: string;
}

export interface LoginUser {
  user_email: string;
  password: string;
}
