import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { PrimaryButton } from "..";

interface Question {
  question: string;
  options: string[];
  correct: string;
}

const questions: Question[] = [
  {
    question: "What is the name of the small star in the story?",
    options: ["Sparkle", "Twink", "Bright"],
    correct: "Twink",
  },
  {
    question: "Who helped Twink understand his importance?",
    options: ["The Sun", "The Moon", "A Comet"],
    correct: "The Moon",
  },
  {
    question: "What did Twink realize by the end of the story?",
    options: [
      "He wanted to be bigger.",
      "He needed to be brighter.",
      "He could make a big difference even as a small star.",
    ],
    correct: "He could make a big difference even as a small star.",
  },
  // Add more questions as needed
];

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = event.target.value;
    setAnswers(updatedAnswers);
  };

//   const handleSubmit = () => {
//     console.log(answers);
//   };

  return (
    <Box
      sx={{
        maxWidth: "80vw",
        m: "auto",
        p: 3,
        bgcolor: "transparent",
        border: "1px solid #227078",
        borderRadius: 4,
      }}
    >
      <Typography variant="h4" sx={{ color: "white", mb: 6 }}>
        Mystical Quest
      </Typography>
      <FormControl component="fieldset">
        {questions.map((question, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            <FormLabel
              component="legend"
              sx={{
                color: "white",
                mb: 1,
                "&.Mui-focused": { color: "white" },
              }}
            >
              {question.question}
            </FormLabel>
            <RadioGroup
              name={`question-${index}`}
              value={answers[index]}
              onChange={(event) => handleChange(event, index)}
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
              {question.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{ color: "white" }}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
        <Box sx={{ display: 'flex', width:'75vw' , justifyContent: 'flex-end', mt: 2 }}>
        <PrimaryButton
          text="Submit"
          onClick={() => console.log("Primary button clicked")}
        />
      </Box>
      </FormControl>
    </Box>
  );
};

export default Quiz;
