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
import { AlertBar, PrimaryButton } from "..";
import { QuizQuestion, QuizProps } from "../../types";
import styles from "./Quiz.module.scss";
import { quizResult } from "../../api/quiz";
import { Slide, SlideProps } from '@mui/material';



type TransitionProps = Omit<SlideProps, 'direction'>;

const Quiz: React.FC<QuizProps> = ({ bookId }) => {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false)
  const [userId, setUserId] = useState("")
  const [alertModal, setAlertModal] = useState(0)

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
      setIsCorrect(false)
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const transitionDown = (props: TransitionProps) => {
    return <Slide {...props} direction="right" />;
  }

  const handleCorrectAnswer = async () => {
    try {
      const scores = 1
      const response = await quizResult(userId, quizData[0].ID, scores)
        if(response.status === 200){
          setAlertModal(1)
        }
    } catch (error) {
      if (error == "Error: 400") {
        setAlertModal(2)
      }
    }    
  }

  const handleWrongAnswer = async () => {
    try {
      setAlertModal(3)
    } catch (error) {    
      if (error == "Error: 409") {
        const scores = 0
        await quizResult(userId, quizData[0].ID, scores)  
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
      {alertModal == 1 && (
        <AlertBar
          newState={{ vertical: "bottom", horizontal: "left" }}
          message={"you got scores 1 point"}
          transition={transitionDown}
          severity="success"
        />
      )}
      {alertModal == 2 && (
        <AlertBar
          newState={{ vertical: "bottom", horizontal: "left" }}
          message={"cannot proceed, you already taken the quiz"}
          transition={transitionDown}
          severity="error"
        />
      )}
      {alertModal == 3 && (
        <AlertBar
          newState={{ vertical: "bottom", horizontal: "left" }}
          message={"you dont get score point"}
          transition={transitionDown}
          severity="info"
        />
      )}
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
            <Button onClick={() => { handleCloseModal(); handleCorrectAnswer(); handleCloseAlertBar(); }}>Close</Button>
          </DialogActions>
        ):(
          <DialogActions>
            <Button onClick={() => { handleCloseModal(); handleWrongAnswer(); handleCloseAlertBar(); }}>Close</Button>
          </DialogActions>
        )}        
      </Dialog>
    </Box>
  );
};

export default Quiz;
