import React from 'react';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { BookCard } from '../../components';
import { useQuery } from 'react-query';
import { fetchNewReleaseBooks } from '../../api/book/bookAPI';
import { BookAttributes } from '../../types'; 

const NewRelease: React.FC = () => {
  const { data: books = [], isLoading, isError } = useQuery<BookAttributes[]>('new-release', fetchNewReleaseBooks);


    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: '10vh 0',
      }}>
        <Box sx={{ 
          display: 'flex', 
          width: '85%', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px'
        }}>
          <Typography color="white" variant="h5">
            New Release
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
  
  export default NewRelease;