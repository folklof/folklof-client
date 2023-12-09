import axios from 'axios';

interface UserProfile {
  ID: string;
  role_id: number;
  username: string;
  email: string;
  phone: string | null;
  age: number | null;
  avatar: string;
  created_date: string;
}

const getUserProfile = async (): Promise<UserProfile> => {
  const endpoint = 'http://localhost:5001/api/v1/users/profile';
  const response = await axios.get<UserProfile>(endpoint, { withCredentials: true});
  return response.data;
};

export default getUserProfile;
