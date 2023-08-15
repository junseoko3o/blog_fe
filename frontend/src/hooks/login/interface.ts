export interface UserProfile {
  id: number;
  email: string;
  user_name: string;
  access_token?: string;
  refresh_token?: string;
}
