import axios from "axios";
import { BookAttributes } from "../../types";

const baseURL = import.meta.env.VITE_BASE_URL;

export type QueryKey = [string, string, string, string, string];

export interface BooksResponse {
  data: BookAttributes[];
  error?: string;
}

// categories page
export const fetchBooks = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: QueryKey;
}): Promise<BooksResponse> => {
  const [_, sort, categoryId, ageGroupId, title] = queryKey;

  const queryParams = new URLSearchParams({
    page: String(pageParam),
    limit: "6",
    sort: String(sort),
    category_id: categoryId,
    agegroup_id: ageGroupId,
  });

  // Add the 'title' to the query parameters if it's provided
  if (title) {
    queryParams.append("title", title);
  }

  try {
    const response = await axios.get<BooksResponse>(
      `${baseURL}/books?${queryParams}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { data: [], error: "No more books available." };
    }
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/category`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const fetchAgeGroups = async () => {
  try {
    const response = await axios.get(`${baseURL}/age-groups`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch age groups:", error);
    throw error;
  }
};

export const fetchBookData = async (bookId: string) => {
  const { data } = await axios.get(`${baseURL}/books/${bookId}`);
  return data.data;
};

export const fetchBestStoriesBooks = async (): Promise<BookAttributes[]> => {
  try {
    const response = await axios.get<BooksResponse>(
      `${baseURL}/books?page=1&limit=6&sort=1`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export const fetchNewReleaseBooks = async (): Promise<BookAttributes[]> => {
  try {
    const response = await axios.get<BooksResponse>(
      `${baseURL}/books?page=1&limit=6&sort=2`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};
