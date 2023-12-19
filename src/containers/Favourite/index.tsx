import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Rating,
  Skeleton
} from '@mui/material';
import { fetchFavouriteBooks, removeFavouriteBook } from '../../api';
import { PrimaryButton, SecondaryButton } from '../../components';
import { FavouriteBook, FavouriteProps } from '../../types';

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
    const response = await removeFavouriteBook(favouriteId);
    if (response.success) {
      setFavouriteBooks(prevBooks => prevBooks.filter(book => book.ID !== favouriteId));
    }
  };

  const renderSkeletons = () => {
    return [...Array(3)].map((_, index) => (
      <Box key={index} sx={{ display: "flex", mb: 2, padding: "1vw 4vw"}}>
        <Skeleton variant="rectangular" width={100} height={100} sx={{ bgcolor: "#f1f1f13d" }}/>
        <Box sx={{ ml: 2, flex: 1 }}>
          <Skeleton variant="text" width="60%" sx={{ bgcolor: "#f1f1f13d" }}/>
          <Skeleton variant="text" width="40%" sx={{ bgcolor: "#f1f1f13d" }}/>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap:"16px" }}>
          <Skeleton variant="rectangular" width={100} height={36} sx={{ bgcolor: "#f1f1f13d" }}/>
          <Skeleton variant="rectangular" width={100} height={36} sx={{ bgcolor: "#f1f1f13d" }}/>
        </Box>
      </Box>
    ));
  };

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: "transparent", padding: "8vw"}}>
        <Typography variant="h5" gutterBottom sx={{ color: 'white', mb:'5vh' }}>
          Favourites
        </Typography>
        {renderSkeletons()}
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "transparent", padding: "8vw"}}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        Favourites
      </Typography>
      <Box sx={{ mt: 0, p: 8}}>
        {favouriteBooks.length > 0 ? (
          favouriteBooks.map((book) => (
            <Box key={book.ID} sx={{ display: "flex", mb: 6, color: 'white' }}>
              <img
                src={book.book.cover_image}
                alt={book.book.title}
                style={{ width: 100, height: 100 }}
              />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="h6" sx={{ color: 'white' }}>{book.book.title}</Typography>
                <Rating
                  name="read-only"
                  value={book.book.avgRating || 0}
                  readOnly
                  precision={0.5}
                />
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Duration: {book.book.duration}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Release date: {new Date(book.book.created_date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap:"16px" }}>
                <PrimaryButton
                  text="Listen Now"
                  onClick={() => handleListenNow(book.book.ID)}
                />
                <SecondaryButton
                  text="Remove"
                  onClick={() => handleRemoveBook(book.ID)}
                />
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', padding:'10vw' }}>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Your Favourite Stories
              <br />
              Find and add your favourite stories to see them here.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FavouritePage;
