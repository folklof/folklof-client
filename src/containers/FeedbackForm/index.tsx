import React, { useState } from 'react';
import { Box, Typography, TextField, Rating } from '@mui/material';
import { PrimaryButton } from '../../components';

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Process the feedback data
    console.log({ rating, title, description });
    // Here you would typically send the feedback to a server
  };

  return (
    <Box
      sx={{
        maxWidth: '80vw',
        margin: '10vw 9vw',
        padding: 0,
        backgroundColor: 'transparent',
        borderRadius: 2,
        color: 'white',
        '& .MuiTextField-root': { marginBottom: 2, backgroundColor: 'white' },
        '& .MuiButton-root': { marginTop: 2 },
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={4}>
        Add your feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography component="legend">Rating :</Typography>
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
        />
        <TextField
          fullWidth
          label="Description"
          variant="filled"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ display: 'flex' , justifyContent: 'flex-end', mt: 2 }}> {/* Additional styles can be added here */}
        <PrimaryButton
          text="Submit"
          onClick={() => console.log("Primary button clicked")}
        />
      </Box>
      </form>
    </Box>
  );
};

export default FeedbackForm;
