import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { BookCard } from '../../components';

const dummyBooks = [
    {
      id: 1,
      title: 'Book Title 1',
      category: 'Fantasy',
      imageUrl: 'src/assets/images/featured-a.webp',
    },
    {
      id: 3,
      title: 'The Brave Little Star',
      category: 'Fantasy',
      imageUrl: 'src/assets/images/featured-b.webp',
    },
    {
      id: 4,
      title: 'Book Title 3',
      category: 'Fantasy',
      imageUrl: 'src/assets/images/featured-c.webp',
    },
    {
      id: 5,
      title: 'Lady Bug',
      category: 'Fantasy',
      imageUrl: 'src/assets/images/heroleft-a.webp',
    },
    {
      id: 6,
      title: 'DragonFly',
      category: 'Fantasy',
      imageUrl: 'src/assets/images/heroleft-b.webp',
    },
    {
      id: 7,
      title: 'DragonFly',
      category: 'Fantasy',
      imageUrl: 'src/assets/images/login-bg.webp',
    },
    
    // Add more dummy book objects
  ];

const NewRelease: React.FC = () => {
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
            <Box sx={{ display: 'flex', justifyContent:"center", marginLeft:"35px", overflowX:"none",flexWrap:"wrap"}}>
              {dummyBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  category={book.category}
                  imageUrl={book.imageUrl}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default NewRelease;