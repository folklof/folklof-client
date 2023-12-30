import React from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BookCard } from "../../components";
import { fetchBestStoriesBooks } from "../../api/book/bookAPI";
import { BookAttributes } from "../../types";
import styles from './BestStories.module.scss';

const BestStories: React.FC = () => {
  const navigate = useNavigate();


  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery<BookAttributes[]>("best-stories", fetchBestStoriesBooks);

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
