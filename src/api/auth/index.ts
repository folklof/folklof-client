import axios from 'axios';
import { UserProfile } from '../../types';

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/users/profile');
  return response.data.data; // Accessing the nested data
};

export const logoutUser = async (): Promise<void> => {
  await api.get('/auth/logout');
};

export const checkUserAuthentication = async () => {
  try {
    const response = await axios.get(`${baseURL}/dashboard/user`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserAge = async (userId: string, age: number) => {
  try {
    const response = await axios.put(`${baseURL}/users/${userId}`, { age });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};