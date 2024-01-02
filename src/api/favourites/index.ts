import axios from 'axios';
import { getUserProfile, fetchRatings } from '../../api';
const baseURL = import.meta.env.VITE_BASE_URL;

// Function to fetch favourite books
export const fetchFavouriteBooks = async () => {
  try {
    const userProfile = await getUserProfile();
    const response = await axios.get(`${baseURL}/favourite/user/${userProfile.ID}`);
    if (response.data.success) {
      const booksWithRatings = await Promise.all(
        response.data.data.map(async (book: any) => {
          const ratings = await fetchRatings(book.book.ID);
          return {
            ...book,
            book: {
              ...book.book,
              avgRating: ratings?.data.avgRating,
            },
          };
        })
      );
      return booksWithRatings;
    } else {
      console.error("Failed to fetch favourite books:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching favourite books:", error);
    return [];
  }
};

// Function to remove a book from favourites
export const removeFavouriteBook = async (favouriteId: string) => {
  try {
    const response = await axios.delete(`${baseURL}/favourite/${favouriteId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing book from favourites:", error);
    throw error;
  }
};

export const addToFavourite = async (bookId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const userProfile = await getUserProfile();
    const payload = {
      user_id: userProfile.ID,
      book_id: bookId,
      is_added: true
    };

    return await axios.post(`${baseURL}/favourite`, payload);
  } catch (error) {
    throw error;
  }
};