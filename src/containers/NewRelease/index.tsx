import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { BookCard } from "../../components";
import { useQuery } from "react-query";
import { fetchNewReleaseBooks } from "../../api/book/bookAPI";
import { BookAttributes, RatingResponse } from "../../types";
import { fetchRatings } from "../../api";
import { getFirstAndSecondName } from "../../utils/Helper/GetFirstAndSecondName";

const NewRelease: React.FC = () => {
  const [ratings, setRatings] = useState<Record<string, RatingResponse | null>>({});
  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery<BookAttributes[]>("new-release", fetchNewReleaseBooks);

  const fetchAndSetRatings = useCallback(async () => {
    const ratingsData: Record<string, RatingResponse | null> = {};
    for (const book of books) {
      const rating = await fetchRatings(book.ID);
      ratingsData[book.ID] = rating;
    }
    setRatings(ratingsData);
  }, [books]);

  useEffect(() => {
    fetchAndSetRatings();
  }, [books, fetchAndSetRatings]);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "10vh 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "85%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography color="white" variant="h5">
          New Release
        </Typography>
      </Box>
      <Grid container justifyContent="center" width="100%">
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              overflowX: "none",
              flexWrap: "wrap",
            }}
          >
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
                  avgRating={String(ratings[book.ID]?.data.avgRating) || "0"} // Use the rating from state and convert it to a string
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

export default NewRelease;
