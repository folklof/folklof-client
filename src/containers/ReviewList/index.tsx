import React from 'react';
import { Box, Typography, Avatar, Rating } from '@mui/material';

interface ReviewListProps {
    bookTitle: string;
  }

// Example review data
const reviews = [
  {
    id: 1,
    user: 'user1',
    date: '12-12-2023',
    rating: 4,
    comment: 'This book was awesome and very intuitive. The audio was good and clear. The story is perfect.',
  },
  // Add more reviews as needed
];

const ReviewList: React.FC<ReviewListProps>= ({ bookTitle }) => {
    
  return (
    <Box sx={{ bgcolor: 'transparent', color: 'white', p: 3, borderRadius: 2, margin:'10vw 8vw' }}>
      <Typography variant="h5" gutterBottom>
      What listeners say about {bookTitle}
      </Typography>
      
      {reviews.map((review) => (
        <Box key={review.id} sx={{ my: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'white', mr: 2 }} />
            <Box>
              <Typography variant="subtitle2">{review.user}</Typography>
              <Typography variant="body2" color="gray">
                {review.date}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ my: 1 }}>
            <Rating value={review.rating} readOnly />
          </Box>
          <Typography variant="body1">{review.comment}</Typography>
        </Box>
      ))}

      <Typography sx={{ cursor: 'pointer', mt: 2 }} onClick={() => console.log('View more clicked')}>
        View More
      </Typography>
    </Box>
  );
};

export default ReviewList;
