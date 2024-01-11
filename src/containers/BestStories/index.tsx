import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BookCard } from "../../components";
import { fetchBestStoriesBooks } from "../../api/book/bookAPI";
import { BookAttributes, RatingResponse } from "../../types";
import styles from "./BestStories.module.scss";
import { fetchRatings } from "../../api";

const BestStories: React.FC = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<string, RatingResponse | null>>({});

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery<BookAttributes[]>("best-stories", fetchBestStoriesBooks);

  useEffect(() => {
    const fetchRating = async (bookId: string): Promise<RatingResponse | null> => {
      try {
        const response = await fetchRatings(bookId);
        return response;
      } catch (error) {
        console.error("Error fetching rating for book ID:", bookId, error);
        return null;
      }
    };

    // Fetch ratings for each book and store in state
    const fetchAllRatings = async () => {
      const ratingsData: Record<string, RatingResponse | null> = {};
      for (const book of books) {
        const rating = await fetchRating(book.ID);
        ratingsData[book.ID] = rating;
      }
      setRatings(ratingsData);
    };

    fetchAllRatings();
  }, [books]);

  const handleSeeAllStoriesClick = () => {
    navigate("/categories");
  };

  return (
    <Box className={styles.bestStoriesContainer}>
      <Box className={styles.header}>
        <Typography className={styles.title} variant="h5">
          Best Stories
        </Typography>
        <Typography
          className={styles.title}
          variant="h5"
          onClick={handleSeeAllStoriesClick}
        >
          See all stories
        </Typography>
      </Box>
      <Grid container className={styles.gridContainer}>
        <Grid item xs={12}>
          <Box className={styles.bookDisplay}>
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
                  imageUrl={book.cover_image}
                  avgRating={ratings[book.ID]?.data.avgRating || 0} // Use the rating from state
                  author={book.user.username}
                />
              ))
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BestStories;
