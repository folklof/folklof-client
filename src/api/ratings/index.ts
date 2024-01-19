import axios from "axios";
import { BASE_URL } from "../../utils/BaseURL";

export interface RatingResponse {
  success: boolean;
  message: string;
  data: {
    avgRating?: number;
    totalBookReviews?: number;
  };
}

export const fetchRatings = async (
  bookId: string
): Promise<RatingResponse | null> => {
  try {
    const response = await axios.get<RatingResponse>(
      `${BASE_URL}/reviews/rating/${bookId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rating for book ID:", bookId, error);
    return null; // Return null if there's an error
  }
};
