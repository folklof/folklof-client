import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import {
  Avatar,
  Typography,
  Grid,
  Box,
  TextField,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { UserRootState } from "../../types";
import { setUserProfile } from "../../store/userSlice";
import { PrimaryButton } from "../../components";
import styles from './Profile.module.scss';

const baseURL = import.meta.env.VITE_BASE_URL;

const Profile: React.FC = () => {
  // Redux state and dispatch
  const userProfile = useSelector((state: UserRootState) => state.user.user);
  const dispatch = useDispatch();

  // State for form data and loading indicators
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // Validation error states
  const [usernameError, setUsernameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Editable profile fields
  const [editableUsername, setEditableUsername] = useState(userProfile?.username || "");
  const [editableEmail, setEditableEmail] = useState(userProfile?.email || "");
  const [editableAge, setEditableAge] = useState<number | string>(userProfile?.age || "");
  const [editablePhone, setEditablePhone] = useState(userProfile?.phone || "");
  const [editableRole, setEditableRole] = useState<number | string>(userProfile?.role?.name || "");

  // Handlers for input changes
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
      setIsDataChanged(true);
    }
  );

  const handleInputChangeAgePhone = (
    setter: React.Dispatch<React.SetStateAction<string | number>>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    setIsDataChanged(true);
  };

  // Snackbar open and close handlers
  const handleSnackbarOpen = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Main update function
  const handleUpdateUser = async () => {
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
        setIsLoading(true);

        const response = await axios.put(`${baseURL}/users/${userProfile?.ID}`, {
          ...updatedUserData
        });

        if (response.data.success) {
          dispatch(setUserProfile(response.data.data));
          handleSnackbarOpen('Profile updated successfully', 'success');
          setIsDataChanged(false);
        } else {
          console.error("Error updating user:", response.data.message);
          handleSnackbarOpen('Error updating user', 'error');
        }
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Avatar change handler
  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image_file", file);
      try {
        const awsResponse = await axios.post(`${baseURL}/users/profile/image/${userProfile?.ID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (awsResponse.data.success) {
          const awsImageURL = awsResponse.data.data.image_link;
          const updateUserResponse = await axios.put(`${baseURL}/users/${userProfile?.ID}`, {
            avatar: awsImageURL,
          });
          dispatch(setUserProfile(updateUserResponse.data.data));
          handleSnackbarOpen('Avatar updated successfully', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        }
      } catch (error) {
        console.error('Error updating avatar:', error);
        handleSnackbarOpen('Error updating avatar', 'error');
      }
    }
  };

  // Utility function to extract date part
  const getDatePart = (timestamp: string | undefined) => {
    return timestamp ? timestamp.split("T")[0] : "";
  };
  const [editableJoinDate, setEditableJoinDate] = useState(getDatePart(userProfile?.created_date) || "");

  // Validation functions
  const validateUsername = (username: string) => {
    if (!/^[a-zA-Z\s]+$/.test(username)) {
      setUsernameError("Username must contain only letters and spaces.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateAge = (age: string) => {
    if (!/^[1-9]\d*$/.test(age)) {
      setAgeError("Age must be a positive number greater than zero.");
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

  // TextField creation function
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
          <Tooltip title={isReadOnlyField ? "Read Only" : ""} placement="bottom">
            <TextField
              className={styles.profileText}
              InputProps={{
                readOnly: readOnly,
                style: { color: readOnly ? 'gray' : 'white' },
                // endAdornment: <InputAdornment position="end" sx={{color:"white"}}>{isDataChanged && <EditIcon />}</InputAdornment>,
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
        </Box>
      </Grid>
    );
  };

  return (
    <>
      <Box className={styles.profileContainer}>
        <Typography className={styles.title} sx={{ fontSize: '60px' }} variant='h4'>
          Profile Page
        </Typography>
        <Typography className={styles.description} sx={{ fontSize: '18px' }}>
          Unleash the enchantment and craft your mystical profile here!
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          {userProfile?.avatar ? (
            <Avatar src={userProfile.avatar} className={styles.avatar} />
          ) : (
            <Typography variant="subtitle1">
              Error
            </Typography>
          )}
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
          <PrimaryButton
            text="Update"
            onClick={handleUpdateUser}
            disabled={!isDataChanged || isLoading}
          />
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