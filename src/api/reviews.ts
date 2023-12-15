import axios from 'axios';
import { Review } from '../types';

export const fetchBookReviews = async (bookId: string): Promise<Review[]> => {
    const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(`${baseURL}/reviews/book/${bookId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching book reviews:', error);
    return []; // Return an empty array in case of an error
  }
};
