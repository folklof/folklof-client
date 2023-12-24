import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Rating, Skeleton } from '@mui/material';
import { fetchFavouriteBooks, removeFavouriteBook } from '../../api';
import { PrimaryButton, SecondaryButton } from '../../components';
import { FavouriteBook, FavouriteProps } from '../../types';
import styles from './Favourite.module.scss';

const FavouritePage: React.FC<FavouriteProps> = ({ onLoaded }) => {
  const navigate = useNavigate();
  const [favouriteBooks, setFavouriteBooks] = useState<FavouriteBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavouriteBooks = async () => {
      setIsLoading(true);
      const books = await fetchFavouriteBooks();
      setFavouriteBooks(books);
      setIsLoading(false);
      if (onLoaded) {
        onLoaded();
      }
    };

    loadFavouriteBooks();
  }, []);

  const handleListenNow = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  const handleRemoveBook = async (favouriteId: string) => {
    try {
      await removeFavouriteBook(favouriteId);
      setFavouriteBooks(prevBooks => prevBooks.filter(book => book.ID !== favouriteId));
    } catch (error) {
      console.error("Error while removing book:", error);
    }
  };

  const renderBooks = () => favouriteBooks.map(book => (
    <Box key={book.ID} className={styles.bookItem}>
      <img src={book.book.cover_image} alt={book.book.title} style={{ width: 120, height: 120, borderRadius:"10px"}} />
      <Box className={styles.bookDetails}>
        <Typography variant="h6">{book.book.title}</Typography>
        <Rating name="read-only" value={book.book.avgRating || 0} readOnly precision={0.5} />
        <Typography variant="body2">Duration: {book.book.duration}</Typography>
        <Typography variant="body2">Release date: {new Date(book.book.created_date).toLocaleDateString()}</Typography>
      </Box>
      <Box className={styles.buttonWrapper}>
        <PrimaryButton text="Listen Now" onClick={() => handleListenNow(book.book.ID)} />
        <SecondaryButton text="Remove" onClick={() => handleRemoveBook(book.ID)} />
      </Box>
    </Box>
  ));

  const renderSkeletons = () => [...Array(3)].map((_, index) => (
    <Box key={index} className={styles.bookItem}>
      <Skeleton variant="rectangular" width={100} height={100} />
      <Box className={styles.bookDetails}>
        <Skeleton variant="text" width="60%"/>
        <Skeleton variant="text" width="40%"/>
      </Box>
      <Box className={styles.buttonWrapper}>
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </Box>
    </Box>
  ));

  return (
    <Box className={styles.favouriteContainer}>
      <Typography variant="h5" gutterBottom className={styles.title}>
        Favourites
      </Typography>
      {isLoading ? renderSkeletons() : (favouriteBooks.length > 0 ? renderBooks() : (
        <Box sx={{ textAlign: 'center', padding: '10vw' }}>
          <Typography variant="body1" sx={{ color: 'white' }}>
            Your Favourite Stories
            <br />
            Find and add your favourite stories to see them here.
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FavouritePage;
