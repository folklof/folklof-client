import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Rating, Divider } from '@mui/material';
import { fetchBookReviews } from '../../api/feedback/reviews';
import { Review as ReviewType } from '../../types';

interface ReviewListProps {
  bookId: string;
  refresh?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ bookId, refresh }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getReviews = async () => {
      // console.log(`Fetching reviews for bookId: ${bookId}`);
      setLoading(true);
  
      try {
        const bookReviews = await fetchBookReviews(bookId);
        // console.log('Fetched reviews:', bookReviews);
  
        if (bookReviews && bookReviews.length > 0) {
          setReviews(bookReviews);
        } else {
          setReviews([]);
          setError('No reviews available for this book.');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };
  
    if (bookId) {
      getReviews();
    } else {
      console.log('Invalid or missing book ID.');
      setError('Invalid book ID.');
      setLoading(false);
    }


  return () => {
    setReviews([]); // Reset reviews when bookId changes
    setError(null); // Reset any errors
  };
}, [bookId, refresh]);
  

  if (isLoading) {
    return <Typography>Loading reviews...</Typography>;
  }

  if (error) {
    return <Typography variant="h5" sx={{color:"white", opacity:"0.5", padding:"5vw 10vw"}}>{error}</Typography>;
  }

  const bookTitle = reviews.length > 0 ? reviews[0].book.title : "Unknown Book";

  return (
    <Box sx={{ bgcolor: 'transparent', color: 'white', p: 3, borderRadius: 2, padding:"8vw" }}>
      <Typography variant="h5" gutterBottom>
        What listeners say about {bookTitle}
      </Typography>    
      {reviews.map((review) => (
        <Box key={review.ID} sx={{ my: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'white', mr: 2 }} src={review.user.avatar} />
            <Box>
              <Typography variant="subtitle2">{review.user.username}</Typography>
              <Typography variant="body2" color="gray">
                {new Date(review.created_date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ my: 1 }}>
            <Rating value={review.rating} readOnly />
          </Box>
          <Typography variant="h5">{review.title}</Typography>
          <Typography variant="body1">{review.description}</Typography>
          <Divider sx={{borderColor:"#f1f1f13d", mt:"32px"}}/>
        </Box>
      ))}

      {/* Assuming 'View More' is a clickable action that does something */}
      {/* <Typography sx={{ cursor: 'pointer', mt: 2 }} onClick={() => console.log('View more clicked')}>
        View More
      </Typography> */}
    </Box>
  );
};

export default ReviewList;
