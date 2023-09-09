export type UserAuthentication = {
  id: number;
  user_email: string;
  user_name: string;
  password: string;
  access_token: string;
  login_at: Date;
  created_at: Date;
  updated_at: Date;
}