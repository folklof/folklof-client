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

const baseURL = import.meta.env.VITE_BASE_URL;

// Create an axios instance with the base URL
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
    // Mengembalikan data dari respons jika sukses
    return response.data; 
  } catch (error) {
    // Tangani error dari axios
    if (axios.isAxiosError(error)) {
      // Ini adalah error dari Axios, bisa menangani lebih spesifik
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      // Error non-Axios
      console.error('Unexpected error:', error);
    }
    throw error; // Melemparkan error untuk ditangani oleh pemanggil fungsi
  }
};