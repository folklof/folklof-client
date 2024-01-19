import axios from "axios";
import { BASE_URL } from "../../utils/BaseURL";

interface FeedbackData {
  user_id: string | null;
  title: string;
  description: string;
  rating: number | null;
}

export const postFeedback = async (
  bookId: string,
  feedbackData: FeedbackData
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/reviews/book/${bookId}`,
      feedbackData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting feedback:", error);
    throw error;
  }
};
