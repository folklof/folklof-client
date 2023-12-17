import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserAge } from "../../api";
import {
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Box,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { PrimaryButton } from "../../components";
import { UserProfile } from "../../types";

const UserAuth: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  // Fetch user profile
  const { isLoading } = useQuery<UserProfile>("userProfile", getUserProfile, {
    onSuccess: (data) => {
      setUser(data);
      if (data.age === null || data.age === undefined) {
        setShowModal(true);
      } else {
        navigate("/dashboard");
      }
    },
    onError: () => {
      navigate("/signin");
    },
  });

  const handleAgeSubmit = async () => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 3) {
      setAgeError(true);
      return;
    }
    try {
      setAgeError(false);
      const updatedUser = await updateUserAge(user?.ID || "", ageNum);
      queryClient.setQueryData("userProfile", updatedUser);
      setShowModal(false);
      setSnackbarOpen(true); // Open the Snackbar

      // Redirect to dashboard after a delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error updating age:", error);
      setAgeError(true);
    }
  };

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : null}
      <Dialog
        open={showModal}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClose={() => {}}
      >
        <DialogContent sx={{ color: "white" }}>
          <Typography variant="h5">
            One step closer to the fairy tale world, {user?.username}. Please
            confirm your age.
          </Typography>
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            error={ageError}
            helperText={ageError ? "Age must be at least 3" : ""}
            sx={{
              mt: 6,
              mb: 4,
              input: { color: "white" },
              "& label": {
                color: "#8C8C8C",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#8C8C8C",
                  borderRadius: "10px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8C8C8C",
                },
                "&:hover fieldset": {
                  borderColor: "#8C8C8C",
                },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <PrimaryButton text="Submit" onClick={handleAgeSubmit} />
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Data saved successfully! Redirecting to dashboard...
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserAuth;
