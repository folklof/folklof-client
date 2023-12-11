import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, SelectChangeEvent, Pagination } from '@mui/material';
import Rating from '@mui/material/Rating';
import {PrimaryButton, SecondaryButton } from '../../components';
import styles from './BookList.module.scss';

// Mock data for books, you will replace this with your actual data source
const books = [
  {
    id: 1,
    title: "The Wind, the Road, and the Way",
    length: "3 minutes",
    releaseDate: "12-03-2023",
    rating: 4, // Rating value here
    image: "/src/assets/images/sample-a.webp", // Replace with your image path
  },
  {
    id: 2,
    title: "The Wind, the Road, and the Way",
    length: "3 minutes",
    releaseDate: "12-03-2023",
    rating: 4, // Rating value here
    image: "/src/assets/images/sample-a.webp", // Replace with your image path
  },
  {
    id: 3,
    title: "The Wind, the Road, and the Way, The Wind, the Road, and the Way",
    length: "3 minutes",
    releaseDate: "12-03-2023",
    rating: 4, // Rating value here
    image: "/src/assets/images/sample-a.webp", // Replace with your image path
  },
  // ...more books
];

const BookList: React.FC = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // You can adjust the number of items per page
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Sort the books based on the sortBy state
  // You need to implement the logic for sorting based on your requirements

  return (
    <Box className={styles.bookList}>
      <Box className={styles.sortByContainer}>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          displayEmpty
          className={styles.sortSelect}
          sx={{borderRadius:"50px"}}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>

      {books.map((book) => (
        <Box key={book.id} className={styles.bookItem}>
          <img src={book.image} alt={book.title} className={styles.bookCover} />
          <Box className={styles.bookDetails}>
          <Box className={styles.bookInfo}>
            <Typography variant="h5" sx={{width:"15vw"}} className={styles.bookTitle}>{book.title}</Typography>
            <Rating name="read-only" value={book.rating} 
             readOnly sx={{ color: '#FDCC64','& .MuiRating-iconEmpty': {color: 'rgba(255, 255, 255, 0.5)'}}} />
            </Box>
            <Box className={styles.bookInfo}>
                <Typography variant="body2">Length: {book.length}</Typography>
                <Typography variant="body2">Release date: {book.releaseDate}</Typography>
            </Box>
          </Box>
          <Box className={styles.buttonWrapper}>
            <PrimaryButton text="Listen Now" onClick={() => console.log('Primary button clicked')} />
            <SecondaryButton text="Add to Favourite" onClick={() => console.log('Secondary button clicked')} />
            <SecondaryButton text="Add to Library" onClick={() => console.log('Secondary button clicked')} />
          </Box>
        </Box>
      ))}
      <Box className={styles.paginationContainer}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '.MuiPaginationItem-root': {
              color: 'white', // Adjusts the text color
            },
            '.Mui-selected': {
              backgroundColor: '#FDCC64', // Color when the button is selected
              color: 'black', // Text color when the button is selected
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default BookList;
