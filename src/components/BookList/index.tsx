import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Rating,
  SelectChangeEvent,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components";
import styles from "./BookList.module.scss";
import { BookAttributes, BookWithRating } from "../../types";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

interface BookListProps {
  books: BookAttributes[];
  sort: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
  isLoading: boolean;
}

const BookList: React.FC<BookListProps> = ({
  books,
  sort,
  handleSortChange,
}) => {
  const navigate = useNavigate();
  const [bookListWithRatings, setBookListWithRatings] = useState<
    BookWithRating[]
  >([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const updatedBooks: BookWithRating[] = await Promise.all(
        books.map(async (book) => {
          try {
            const response = await axios.get(
              `${baseURL}/reviews/rating/${book.ID}`
            );
            return { ...book, ...response.data.data };
          } catch (error) {
            console.error("Error fetching rating for book ID:", book.ID, error);
            return { ...book };
          }
        })
      );

      setBookListWithRatings(updatedBooks);
    };

    if (books.length > 0) {
      fetchRatings();
    }
  }, [books]);

  return (
    <Box className={styles.bookList}>
      <Box className={styles.sortByContainer}>
        <Select
          value={sort}
          onChange={handleSortChange}
          displayEmpty
          className={styles.sortSelect}
          sx={{ borderRadius: "50px" }}
        >
          <MenuItem value="1">Oldest</MenuItem>
          <MenuItem value="2">Latest</MenuItem>
        </Select>
      </Box>

      {bookListWithRatings.map((book) => (
        <Box key={book.ID} className={styles.bookItem}>
          <img
            src={book.cover_image}
            alt={book.title}
            className={styles.bookCover}
          />
          <Box className={styles.bookDetails}>
            <Box>
              <Typography variant="h5" className={styles.bookTitle}>
                {book.title}
              </Typography>
              <Rating
                name="read-only"
                value={book.avgRating || 0}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarBorderIcon
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                  />
                }
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "gold",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                  "& .MuiRating-iconHover": {
                    color: "gold",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2">Duration: {book.duration}</Typography>
              <Typography variant="body2">
                Release date: {new Date(book.created_date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.buttonWrapper}>
            <PrimaryButton
              text="Listen Now"
              onClick={() => navigate(`/book/${book.ID}`)}
            />
            <SecondaryButton
              text="Add to Favourite"
              onClick={() => console.log("Add to Favourite clicked", book.ID)}
            />
            <SecondaryButton
              text="Add to Library"
              onClick={() => console.log("Add to Library clicked", book.ID)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BookList;
