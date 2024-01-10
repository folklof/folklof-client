/* eslint-disable no-useless-catch */
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;


export const fetchQuizData = async (bookId: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/book-quiz/book/${bookId}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const submitQuizAnswer = async (quizId: string, answer: string) => {
    try {
      const response = await axios.post(`${baseURL}/book-quiz/answer/${quizId}`, {
        user_answer: answer
      });
      console.log('test',response )
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        throw new Error(errorMessage);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

export const quizAttempt = async (userId: string, quizId: string) => {
  try {
    const response = await axios.get(`${baseURL}/history-quiz/attempt/quiz/user/${userId}/bookquiz/${quizId}`)
    return response
  } catch (error : any) {
    throw new Error(error.response.status)
  }
}
  
export const quizResult = async (userId: string, bookId: string, score: number, attempt: number) => {
  try {
    const response = await axios.post(`${baseURL}/history-quiz`, {
      user_id: userId,
      bookquiz_id: bookId,
      scores: score,
      attempt_failed: attempt
    });
    return response
  } catch (error : any) {
      console.log('status', error.res )
      throw new Error(error.response.status)
  }
}