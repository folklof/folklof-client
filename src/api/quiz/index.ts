import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;


export const fetchQuizData = async (bookId: string) => {
  // eslint-disable-next-line no-useless-catch
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
    // console.log(' ',error )
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        throw new Error(errorMessage);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };
  
export const quizResult = async (userId: string, bookId: string, score: number) => {
  try {
    const response = await axios.post(`${baseURL}/history-quiz`, {
      user_id: userId,
      bookquiz_id: bookId,
      scores: score
    });
    return response
  } catch (error : any) {
      throw new Error(error.response.status)
  }
}