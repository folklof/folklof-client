import React from 'react';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';

interface BookCardProps {
  title: string;
  category: string;
  imageUrl: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, category, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 253, bgcolor: 'transparent', borderRadius: 3, marginRight:'33px'}}>
      <CardMedia
        component="img"
        height="250"
        image={imageUrl}
        alt={title}
        sx={{ borderRadius: 2 }}
      />
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h6" 
          color="white"
          component="div"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="white">
          {category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
