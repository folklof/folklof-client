import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { PrimaryButton } from "../../components";
import { getUserProfile, postFeedback } from "../../api";

interface FeedbackFormProps {
  bookId: string;
  onNewReview: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ bookId, onNewReview }) => {
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openWarningSnackbar, setOpenWarningSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserId(userProfile.ID);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCloseSnackbar = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId || !title || !description || rating === null || rating < 1) {
      setWarningMessage(
        "Please fill in all fields and provide a rating of at least 1"
      );
      setOpenWarningSnackbar(true);
      return;
    }

    const feedbackData = {
      user_id: userId,
      title,
      description,
      rating,
    };

    try {
      // Use the postFeedback function from the API service
      await postFeedback(bookId, feedbackData);
      console.log("Feedback submitted");
      setSuccessMessage("Feedback submitted successfully!");
      setOpenSuccessSnackbar(true);
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
          required
          sx={{
            borderRadius: "8px",
            "& label": {
              color: "white",
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiFilledInput-root": {
              backgroundColor: "transparent",
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
          required
          sx={{
            borderRadius: "8px",
            "& label": {
              color: "white",
            },
            "& .MuiInputBase-input": {
              color: "white",
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
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar(setOpenSuccessSnackbar)}
      >
        <Alert
          onClose={handleCloseSnackbar(setOpenSuccessSnackbar)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Warning Snackbar */}
      <Snackbar
        open={openWarningSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar(setOpenWarningSnackbar)}
      >
        <Alert
          onClose={handleCloseSnackbar(setOpenWarningSnackbar)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {warningMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeedbackForm;
