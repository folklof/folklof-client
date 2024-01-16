import axios from "axios";
import { UserProfile } from "../../types";
import { BASE_URL } from "../../utils/BaseURL";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/users/profile");
  return response.data.data; // Accessing the nested data
};

export const logoutUser = async (): Promise<void> => {
  await api.get("/auth/logout");
};

export const checkUserAuthentication = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserAge = async (userId: string, age: number) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, { age });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
