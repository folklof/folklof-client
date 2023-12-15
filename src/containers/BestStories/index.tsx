import React from 'react';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BookCard } from '../../components';
import { fetchBestStoriesBooks } from '../../api/book/bookAPI'; // Adjust path if necessary
import { BookAttributes } from '../../types'; // Adjust path if necessary

const BestStories : React.FC= () => {
  const navigate = useNavigate();

  // Fetch best stories books

const { data: books = [], isLoading, isError } = useQuery<BookAttributes[]>('best-stories', fetchBestStoriesBooks);


  const handleSeeAllStoriesClick = () => {
    navigate('/categories');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
      <Box sx={{ display: 'flex', width: '85%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography color="white" variant="h5">
          Best Stories
        </Typography>
        <Typography color="white" variant="h5" sx={{ cursor: 'pointer' }} onClick={handleSeeAllStoriesClick}>
          See all stories
        </Typography>
      </Box>
      <Grid container justifyContent="center" width="100%">
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '35px', overflowX: 'none', flexWrap: 'wrap' }}>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={118} />
            ) : isError ? (
              <Typography color="error">Error loading stories.</Typography>
            ) : (
              books.map((book) => (
                <BookCard
                  id={book.ID} 
                  key={book.ID}
                  title={book.title}
                  category={book.category.name}
                  imageUrl={book.cover_image}                />
              ))
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BestStories;
