// BookList.tsx
import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Rating,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from "../../components";
import styles from "./BookList.module.scss";
import { BookAttributes } from "../../types";

interface BookListProps {
  books: BookAttributes[];
  sort: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
  isLoading: boolean;  // Add this line
}



const BookList: React.FC<BookListProps> = ({
  books,
  sort,
  handleSortChange,
}) => {
  const navigate = useNavigate();
  
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

      {books.map((book) => (
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
              <Rating name="read-only" value={5} readOnly />{" "}
              {/* Adjust rating logic */}
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
