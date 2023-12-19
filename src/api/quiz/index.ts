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
  
