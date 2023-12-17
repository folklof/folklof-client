import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

interface FeedbackData {
    user_id: string | null;
    title: string;
    description: string;
    rating: number | null;
  }

export const postFeedback = async (bookId:string, feedbackData: FeedbackData) => {
  try {
    const response = await axios.post(`${baseURL}/reviews/book/${bookId}`, feedbackData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error posting feedback:", error);
    throw error;
  }
};
