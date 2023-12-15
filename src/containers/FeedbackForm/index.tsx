import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { PrimaryButton } from "../../components";

interface FeedbackFormProps {
  bookId: string;
  onNewReview: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ bookId, onNewReview }) => {
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            withCredentials: true,
          }
        );
        setUserId(response.data.data.ID);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const feedbackData = {
      user_id: userId,
      title,
      description,
      rating,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reviews/book/${bookId}`,
        feedbackData
      );
      console.log("Feedback submitted:", response.data);
      setSnackbarMessage("Feedback submitted successfully!");
      setOpenSnackbar(true);
      // Reset form fields
      setTitle("");
      setDescription("");
      setRating(0);
      onNewReview();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Handle errors
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "80vw",
        margin: "10vw 9vw",
        padding: 0,
        backgroundColor: "transparent",
        borderRadius: 2,
        color: "white",
        "& .MuiTextField-root": {
          marginBottom: 2,
          backgroundColor: "#f1f1f13d",
        },
        "& .MuiButton-root": { marginTop: 2 },
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={4}>
        Add your feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            height: "55px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            backgroundColor: "#f1f1f13d",
          }}
        >
          <Typography sx={{ color: "white", marginLeft: "12px" }}>
            Rating :
          </Typography>
          <Rating
            name="feedback-rating"
            value={rating}
            onChange={(_event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        <TextField
          fullWidth
          label="Title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            borderRadius: "8px",
            "& label": {
              color: "white", // Style for label
            },
            "& .MuiInputBase-input": {
              color: "white", // Style for input text
            },
            "& .MuiFilledInput-root": {
              backgroundColor: "transparent", // Optional: Adjust background if needed
            },
          }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="filled"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            borderRadius: "8px",
            "& label": {
              color: "white", // Style for label
            },
            "& .MuiInputBase-input": {
              color: "white", // Style for input text
            },
            "& .MuiFilledInput-root": {
              backgroundColor: "transparent",
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <PrimaryButton type="submit" text="Submit" onClick={console.log} />
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeedbackForm;
