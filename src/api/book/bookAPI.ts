import axios from "axios";
import { BookAttributes, PopularBook } from "../../types";
import { BASE_URL } from "../../utils/BaseURL";

export type QueryKey = [string, string, string, string, string];

export interface BooksResponse {
  totalBook: number;
  data: BookAttributes[];
  error?: string;
}

export const fetchBooks = async ({
  pageParam,
  limit,
  queryKey,
}: {
  pageParam?: number;
  limit?: string;
  queryKey: QueryKey;
}): Promise<BooksResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, sort, categoryId, ageGroupId, title] = queryKey;
  const queryParams = new URLSearchParams({
    page: String(pageParam),
    limit: String(limit),
    sort: String(sort),
    category_id: categoryId,
    agegroup_id: ageGroupId,
  });

  if (title) {
    queryParams.append("title", title);
  }

  try {
    const response = await axios.get<BooksResponse>(
      `${BASE_URL}/books?${queryParams}`
    );

    if (response.data && response.data.data.length > 0) {
      return response.data;
    } else {
      return {
        totalBook: response.data.totalBook,
        data: [],
        error: "No books found matching the criteria.",
      };
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      totalBook: 0,
      data: [],
      error: "An error occurred while fetching books.",
    };
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const fetchAgeGroups = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/age-groups`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch age groups:", error);
    throw error;
  }
};

export const fetchBookData = async (bookId: string) => {
  const { data } = await axios.get(`${BASE_URL}/books/${bookId}`);
  return data.data;
};

export const fetchBestStoriesBooks = async (): Promise<PopularBook[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/popular`);
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
      `${BASE_URL}/books?page=1&limit=6&sort=2`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export const fetchBookQuery = async (
  page: number,
  category_id: string,
  agegroup_id: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/books?page=${page}&limit=5$sort=2&category_id=${category_id}&agegroup_id=${agegroup_id}}`
    );
    if (response.data && response.data.data.length > 0) {
      return response.data;
    } else {
      return { data: [], error: "No books found matching the criteria." };
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return { data: [], error: "An error occurred while fetching books." };
  }
};
