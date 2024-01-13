import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Typography, Grid, Box, TextField, CircularProgress, IconButton, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
import { UserRootState } from "../../types";
import { PrimaryButton } from "../../components";
import styles from './Profile.module.scss';
import { setUserProfile } from "../../store/userSlice";
import Tooltip from "@mui/material/Tooltip";

const Profile: React.FC = () => {
  const userProfile = useSelector((state: UserRootState) => state.user.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const [usernameError, setUsernameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateUsername = (username: string) => {
    if (!/^[a-zA-Z\s]+$/.test(username)) {
      setUsernameError("Username must contain only letters and spaces.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateAge = (age: string) => {
    if (!/^\d+$/.test(age)) {
      setAgeError("Age must be a number.");
      return false;
    }
    setAgeError("");
    return true;
  };

  const validatePhone = (phone: string) => {
    if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone must contain only numbers.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);

    const isUsernameValid = validateUsername(editableUsername);
    const isAgeValid = validateAge(editableAge as string);
    const isPhoneValid = validatePhone(editablePhone);

    if (isUsernameValid && isAgeValid && isPhoneValid) {
      const updatedUserData = {
        name: editableUsername,
        email: editableEmail,
        age: parseInt(editableAge as string, 10),
        phone: editablePhone,
        role_id: editableRole,
        created_date: editableJoinDate,
      };

      try {
        const response = await axios.put(`${baseURL}/users/${userProfile?.ID}`, {
          ...updatedUserData
        });

        if (response.data.success) {
          dispatch(setUserProfile(response.data.data));
          handleSnackbarOpen('Profile updated successfully', 'success');
        } else {
          console.error("Error updating user:", response.data.message);
          handleSnackbarOpen('Error updating user', 'error');
        }
      } catch (error) {
        console.log("Error updating user:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }
  const getDatePart = (timestamp: string | undefined) => {
    if (timestamp) {
      const datePart = timestamp.split("T")[0];
      return datePart;
    }
    return "";
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      console.log('FormData:', formData);

      try {
        const response = await axios.put(`${baseURL}/users/${userProfile?.ID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Server response:', response);

        if (response.data.success) {
          dispatch(setUserProfile(response.data.data));
          handleSnackbarOpen('Avatar updated successfully', 'success');
        } else {
          console.error('Error updating avatar:', response.data.message);
          handleSnackbarOpen('Error updating avatar', 'error');
        }
      } catch (error) {
        console.log('Error updating avatar:', error);
      }
    }
  }

  const [editableUsername, setEditableUsername] = useState(userProfile?.username || "");
  const [editableEmail, setEditableEmail] = useState(userProfile?.email || "");
  const [editableAge, setEditableAge] = useState<number | string>(userProfile?.age || "");
  const [editablePhone, setEditablePhone] = useState(userProfile?.phone || "");
  const [editableRole, setEditableRole] = useState<number | string>(userProfile?.role?.name || "");
  const [editableJoinDate, setEditableJoinDate] = useState(getDatePart(userProfile?.created_date) || "");

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value)
  );

  const handleInputChangeAgePhone = (
    setter: React.Dispatch<React.SetStateAction<string | number>>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const createTextField = (
    label: string,
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    readOnly: boolean = false,
    error: string = ""
  ) => {
    const isReadOnlyField = ["Email", "Role", "Join Date"].includes(label);

    return (
      <Grid item xs={12} sm={6} className={styles.gridDescription}>
        <Typography className={styles.description}>{label}</Typography>
        <Box className={styles.boxText}>
          {isReadOnlyField ? (
            <Tooltip title="Read Only" placement="right">
              <TextField
                className={styles.profileText}
                InputProps={{
                  readOnly: readOnly,
                  style: { color: readOnly ? 'gray' : 'white' },
                }}
                value={value}
                onChange={onChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: 'none' }, padding: '0px'
                }}
                error={Boolean(error)}
                helperText={error}
              />
            </Tooltip>
          ) : (
            <TextField
              className={styles.profileText}
              InputProps={{
                readOnly: readOnly,
                style: { color: readOnly ? 'gray' : 'white' },
              }}
              value={value}
              onChange={onChange}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { border: 'none' }, padding: '0px'
              }}
              error={Boolean(error)}
              helperText={error}
            />
          )}
        </Box>
      </Grid>
    );
  };

  return (
    <>
      {isLoading ? <CircularProgress /> : null}
      <Box className={styles.profileContainer}>
        <Typography className={styles.description} sx={{ fontSize: '60px' }} variant='h4'>
          Profile Page
        </Typography>
        <Typography className={styles.description} sx={{ fontSize: '18px' }} variant='h4'>
          Set up your profile page here
        </Typography>

        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <Avatar src={userProfile?.avatar} className={styles.avatar} />
          <input
            type="file"
            accept="image/*"
            id="avatarInput"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatarInput">
            <IconButton component="span" className={styles.iconButton}>
              <Box className={styles.iconButtonContainer}>
                <PhotoCameraIcon />
              </Box>
            </IconButton>
          </label>
        </Box>

        <Grid container spacing={3}>
          {createTextField("Username", editableUsername, handleInputChange(setEditableUsername), false, usernameError)}
          {createTextField("Email", editableEmail, handleInputChange(setEditableEmail), true)}
          {createTextField("Age", editableAge, handleInputChangeAgePhone(setEditableAge), false, ageError)}
          {createTextField("Role", editableRole, handleInputChangeAgePhone(setEditableRole), true)}
          {createTextField("Phone", editablePhone, handleInputChange(setEditablePhone), false, phoneError)}
          {createTextField("Join Date", editableJoinDate, handleInputChange(setEditableJoinDate), true)}
        </Grid>
        <Box className={styles.buttonContainer}>
          <PrimaryButton text="Update" onClick={handleUpdateUser} />
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Profile;