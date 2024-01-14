import React from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BookCard } from "../../components";
import { fetchBestStoriesBooks } from "../../api/book/bookAPI";
import { BookAttributes, RatingResponse } from "../../types";
import styles from "./BestStories.module.scss";
import { fetchRatings } from "../../api";
import { getFirstAndSecondName } from "../../utils/Helper/GetFirstAndSecondName";

const BestStories: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: books = [],
    isLoading: isLoadingBestStory,
    isError: isErrorBestStory,
  } = useQuery<BookAttributes[]>("best-stories", fetchBestStoriesBooks);

  const { data: ratings = {}, isLoading: isLoadingBookRating, isError: isErrorBookRating } = useQuery<Record<string, RatingResponse | null>>(
    "book-rating",
    async () => {
      const ratings: Record<string, RatingResponse | null> = {};
      for (const book of books) {
        const rating = await fetchRatings(book.ID);
        ratings[book.ID] = rating;
      }
      return ratings;
    },
    {
      enabled: !!books.length, // Only fetch ratings when books are available
    }
  );

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
            {isLoadingBestStory && isLoadingBookRating ? (
              <Skeleton variant="rectangular" width="100%" height={118} />
            ) : isErrorBestStory && isErrorBookRating ? (
              <Typography color="error">Error loading stories.</Typography>
            ) : (
              books.map((book) => (
                <BookCard
                  id={book.ID}
                  key={book.ID}
                  title={book.title}
                  category={book.category.name}
                  imageUrl={book.cover_image}
                  avgRating={String(ratings[book.ID]?.data.avgRating) || "0"}
                  iconRole={book.user.role_id}
                  author={getFirstAndSecondName(book.user.username)}
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
