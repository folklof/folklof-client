import axios from "axios";
import { getUserProfile, fetchRatings } from "../index";
import { LibraryBook } from "../../types";
import { BASE_URL } from "../../utils/BaseURL";

export const fetchLibraryBooks = async () => {
  try {
    const userProfile = await getUserProfile();
    const response = await axios.get(`${BASE_URL}/library/${userProfile.ID}`);

    if (response.data.success) {
      const booksWithRatings = await Promise.all(
        response.data.data.map(async (libraryBook: LibraryBook) => {
          const ratings = await fetchRatings(libraryBook.book.ID);
          return {
            ...libraryBook,
            book: {
              ...libraryBook.book,
              avgRating: ratings?.data.avgRating,
            },
          };
        })
      );
      return booksWithRatings;
    } else {
      console.error("Failed to fetch library:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching library:", error);
    return [];
  }
};

export const removeLibraryBook = async (libraryId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/library/${libraryId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to remove book");
    }
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error removing book from library:", error);
    throw error; // Re-throw the error to be handled by the calling component
  }
};

export const addToLibrary = async (bookId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const userProfile = await getUserProfile();
    const payload = {
      user_id: userProfile.ID,
      book_id: bookId,
      is_read: false,
    };

    return await axios.post(`${BASE_URL}/library`, payload);
  } catch (error) {
    throw error;
  }
};

export const updateLibraryStatus = async (
  libraryId: string,
  isRead: boolean
): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/library/${libraryId}`, { is_read: isRead });
  } catch (error) {
    console.error("Error updating library status:", error);
    throw error;
  }
};
