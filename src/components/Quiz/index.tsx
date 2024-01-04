import React, { useState, useEffect } from "react";
import { fetchQuizData, getUserProfile, submitQuizAnswer } from "../../api";
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
import { PrimaryButton } from "..";
import { QuizQuestion, QuizProps } from "../../types";
import styles from "./Quiz.module.scss";
import { quizResult } from "../../api/quiz";

const Quiz: React.FC<QuizProps> = ({ bookId }) => {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizData(bookId);
        setQuizData(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await getUserProfile()
        setUserId(userData.ID)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
    fetchUser();

  }, [bookId]);

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
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCorrectAnswer = async () => {
    try {
      const scores = 1
      const response = await quizResult(userId, quizData[0].ID, scores)
      console.log(' ',response)
        if(response.status === 200){
          alert("you got score 1 point");
        }
    } catch (error) {
      if (error == "Error: 400") {
        alert("cannot proceed, because you have already taken the quiz")
      }
    }    
  }

  // const handleWrongAnswer = async () => {
  //   try {
  //     const scores = 0
  //     await quizResult(userId, quizData[0].ID, scores)      
  //   } catch (error) {
  //   console.log(' ',error);    
  //     if (error == "Error: 400") {
  //       alert("you already take the quiz")
  //     }
  //   }    
  // }

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
      <Typography variant="h4" className={styles.quizTitle}>
        Mystical Quest
      </Typography>
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
            <Button onClick={() => { handleCloseModal(); handleCorrectAnswer(); }}>Close</Button>
          </DialogActions>
        ):(
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        )}        
      </Dialog>
    </Box>
  );
};

export default Quiz;
