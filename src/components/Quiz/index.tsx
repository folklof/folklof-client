/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useState, useEffect, useCallback } from "react";
import { fetchQuizData, submitQuizAnswer } from "../../api";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Skeleton,
  FormLabel,
} from "@mui/material";
import { AlertBar, PrimaryButton, QuizBackdrop } from "..";
import { QuizQuestion, QuizProps } from "../../types";
import styles from "./Quiz.module.scss";
import { quizAttempt, quizResult } from "../../api/quiz";
import { Slide, SlideProps } from '@mui/material';
import { useSelector } from "react-redux";
import { UserRootState } from "../../types";



type TransitionProps = Omit<SlideProps, 'direction'>;

const Quiz: React.FC<QuizProps> = ({ bookId }) => {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false)
  const [answerAttempt, setAnswerAttempt] = useState(0)
  const [isAllowedToAnswer, setIsAllowedToAnswer] = useState(true)
  const [alertModal, setAlertModal] = useState(0)

console.log('current attempt',answerAttempt )

  const userData = useSelector((state: UserRootState) => state.user.user);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchQuizData(bookId);
      setQuizData(data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [bookId]);

  const fetchQuizAttempt = useCallback(async () => {
    try {
      const quizId = quizData?.[0]?.ID;
      if (quizId) {
        const attempt = await quizAttempt(userData?.ID!, quizId);
        console.log('attempt', attempt)
        setAnswerAttempt(attempt.data.data.attempt_quiz_failed);
        setIsAllowedToAnswer(attempt.data.isAllowed);
      }
    } catch (error) {
      if (error == "Error: 409") {
        setIsAllowedToAnswer(false);
      }
    }
  }, [quizData, userData?.ID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (quizData) {
      fetchQuizAttempt();
    }
  }, [quizData, fetchQuizAttempt]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    if (!quizData.length || !answer) {
      console.log("No question selected or no answer chosen.");
      return;
    }

    try {
      const quizId = quizData[0].ID;
      const response = await submitQuizAnswer(quizId, answer);
      setModalMessage(response.message);
      setIsModalOpen(true);
      if (response.success) {
        setIsCorrect(true)
      }
    } catch (error) {
      setModalMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setIsCorrect(false)
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const transitionSide = (props: TransitionProps) => {
    return <Slide {...props} direction="right" />;
  }

  const handleCorrectAnswer = async () => {
    try {
      const scores = 1
      const attempt = 0
      const response = await quizResult(userData?.ID!, quizData[0].ID, scores, attempt)
        if(response.status === 200){
          setAlertModal(1)
        }
    } catch (error) {
      console.log(error)
    }    
  }

  const handleWrongAnswer = async () => {
    try {
      setAlertModal(2)
    } catch (error) {    
      try {
        if (error === "Error : 400" && answerAttempt >= 0 && answerAttempt < 2) {
          const newAttempt = answerAttempt + 1;
          setAnswerAttempt(newAttempt);
  
          const scores = 0;
          const attempt = newAttempt;
  
          await quizResult(userData?.ID!, quizData?.[0]?.ID, scores, attempt);
          fetchQuizAttempt();
        }
      } catch (innerError) {
        console.error("Error in handleWrongAnswer:", innerError);
      }
    }    
  }

  const handleCloseAlertBar = () => {    
    setTimeout(() => {
      setAlertModal(0);
    }, 2000);
  };

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: "80vw", m: "auto", p: 3 }}>
        <Skeleton variant="text" width="80%" height={60} />
        <Skeleton variant="rectangular" width="80%" height={118} />
      </Box>
    );
  }

  if (error) return <div>An error has occurred</div>;

  const singleQuestion = quizData.length > 0 ? quizData[0] : null;

  return (
    <Box className={styles.quizBox}>
      {isAllowedToAnswer == false && <QuizBackdrop />}
        <Box className={styles.quizHead}>
          <Typography variant="h4" className={styles.quizTitle}>
            Mystical Quest
          </Typography>      
          <Typography variant="h4" sx={{fontSize: "1.1rem"}} className={styles.quizTitle}>
            Wrong Attempts : {answerAttempt}/2
          </Typography>
        </Box>
      {singleQuestion && (
        <FormControl component="fieldset">
          <Box sx={{ mb: 6, padding: 3 }}>
            <FormLabel
              component="legend"
              sx={{
                color: "white",
                mb: 1,
                "&.Mui-focused": { color: "white" },
              }}
            >
              {singleQuestion.question}
            </FormLabel>
            <RadioGroup
              name="quiz-question"
              value={answer}
              onChange={handleChange}
              row
              sx={{
                ".MuiFormControlLabel-root": {
                  marginRight: 4,
                },
                ".MuiRadio-root": {
                  color: "white",
                },
                ".Mui-checked": {
                  color: "#FDCC64",
                },
              }}
            >
              {[
                singleQuestion.option1,
                singleQuestion.option2,
                singleQuestion.option3,
              ].map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{ color: "white" }}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "75vw",
              justifyContent: "flex-end",
              mb: 3,
            }}
          >
            <PrimaryButton text="Submit" onClick={handleSubmit} disabled={answer === ""} />
          </Box>
        </FormControl>
      )}

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Quest Outcome</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalMessage}</DialogContentText>
        </DialogContent>
        {isCorrect ? (
          <DialogActions>
            <Button onClick={() => { handleCloseModal(); handleCorrectAnswer(); handleCloseAlertBar(); setIsAllowedToAnswer(false)}}>Close</Button>
          </DialogActions>
        ):(
          <DialogActions>
            <Button onClick={() => { handleCloseModal(); handleWrongAnswer(); handleCloseAlertBar(); }}>Close</Button>
          </DialogActions>
        )}        
      </Dialog>
      {alertModal == 1 && (
        <AlertBar
          newState={{ vertical: "bottom", horizontal: "left" }}
          message={"you got scores 1 point"}
          transition={transitionSide}
          severity="success"
        />
      )}
      {alertModal == 2 && (
        <AlertBar
          newState={{ vertical: "bottom", horizontal: "left" }}
          message={"you dont get score point"}
          transition={transitionSide}
          severity="info"
        />
      )}
    </Box>
  );
};

export default Quiz;
