/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios from "axios";
import { BASE_URL } from "../../utils/BaseURL";

export const fetchQuizData = async (bookId: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/book-quiz/book/${bookId}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const submitQuizAnswer = async (quizId: string, answer: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/book-quiz/answer/${quizId}`,
      {
        user_answer: answer,
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.status.toString());
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const quizAttempt = async (userId: string, quizId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/history-quiz/attempt/quiz/user/${userId}/bookquiz/${quizId}`
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

export const quizResult = async (
  userId: string,
  bookId: string,
  score: number,
  attempt: number
) => {
  try {
    const response = await axios.post(`${BASE_URL}/history-quiz`, {
      user_id: userId,
      bookquiz_id: bookId,
      scores: score,
      attempt_failed: attempt,
    });
    console.log("res", response);
    return response;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};
