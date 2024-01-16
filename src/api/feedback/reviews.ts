import axios from "axios";
import { Review } from "../../types";
import { BASE_URL } from "../../utils/BaseURL";

export const fetchBookReviews = async (bookId: string): Promise<Review[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/book/${bookId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching book reviews:", error);
    return [];
  }
};
