import axios from 'axios';

export interface UserProfile {
  ID: string;
  role_id: number;
  username: string;
  email: string;
  phone: string | null;
  age: number | null;
  avatar: string;
  created_date: string;
}

export const getUserProfile = async () => {
  const endpoint = 'http://localhost:5001/api/v1/users/profile';
  const response = await axios.get(endpoint, { withCredentials: true });
  return response.data.data; // Accessing the nested data
};

export const logoutUser = async (): Promise<void> => {
  const endpoint = 'http://localhost:5001/api/v1/auth/logout';
  await axios.get(endpoint, {withCredentials: true});
};
