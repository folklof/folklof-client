import React from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BookCard } from "../../components";
import { fetchBestStoriesBooks } from "../../api/book/bookAPI";
import { PopularBook } from "../../types";
import styles from "./BestStories.module.scss";
import { getFirstAndSecondName } from "../../utils/Helper/GetFirstAndSecondName";

const BestStories: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: books = [],
    isLoading: isLoadingBestStory,
    isError: isErrorBestStory,
  } = useQuery<PopularBook[]>("best-stories", fetchBestStoriesBooks);

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
          className={styles.allStories}
          variant="h5"
          onClick={handleSeeAllStoriesClick}
        >
          See all stories
        </Typography>
      </Box>
      <Grid container className={styles.gridContainer}>
        <Grid item xs={12}>
          <Box className={styles.bookDisplay}>
            {isLoadingBestStory ? (
              <Skeleton variant="rectangular" width="100%" height={118} />
            ) : isErrorBestStory ? (
              <Typography color="error">Error loading stories.</Typography>
            ) : (
              books.map((book) => (
                <BookCard
                  id={book.book_id}
                  key={book.book_id}
                  title={book.book?.title || "N/A"}
                  category={book.book?.category.name || "N/A"}
                  imageUrl={book.book?.cover_image || ""}
                  avgRating={book.avgRating || "0"}
                  iconRole={book.book?.user.role_id}
                  author={getFirstAndSecondName(book.book?.user.username ?? "")}
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
