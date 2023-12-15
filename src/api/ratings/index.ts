import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export interface RatingResponse {
  success: boolean;
  message: string;
  data: {
    avgRating?: number;
    totalBookReviews?: number;
  };
}

export const fetchRatings = async (bookId: string): Promise<RatingResponse | null> => {
  try {
    const response = await axios.get<RatingResponse>(`${baseURL}/reviews/rating/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rating for book ID:', bookId, error);
    return null; // Return null if there's an error
  }
};
