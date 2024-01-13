import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  SelectChangeEvent,
  Skeleton,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components";
import styles from "./BookList.module.scss";
import {
  BookAttributes,
  BookWithRating,
  RatingResponse,
} from "../../types";
import { fetchRatings, addToLibrary, addToFavourite } from "../../api";
import axios from "axios";
import VerifiedIcon from "@mui/icons-material/Verified";
import HeadsetIcon from '@mui/icons-material/Headset';
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { getFirstAndSecondName } from "../../utils/Helper/GetFirstAndSecondName";

interface BookListProps {
  books: BookAttributes[];
  sort: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
}

const BookList: React.FC<BookListProps> = ({ books}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [bookListWithRatings, setBookListWithRatings] = useState<
    BookWithRating[]
  >([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRatingsForBooks = async () => {
      const updatedBooks: BookWithRating[] = await Promise.all(
        books.map(async (book) => {
          const ratings: RatingResponse | null = await fetchRatings(book.ID);
          const avgRatingAsString: string | undefined =
            ratings?.data.avgRating?.toString();
          return ratings
            ? { ...book, avgRating: avgRatingAsString }
            : { ...book };
        })
      );
      setBookListWithRatings(updatedBooks);
    };

    if (books.length > 0) {
      fetchRatingsForBooks();
    }
  }, [books]);

  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve();
      });
    };

    const loadImages = async () => {
      const promises = bookListWithRatings.map((book) =>
        loadImage(book.cover_image)
      );
      await Promise.all(promises);
      setIsLoading(false);
    };

    if (bookListWithRatings.length > 0) {
      loadImages();
    } else {
      setIsLoading(false);
    }
  }, [bookListWithRatings]);

  const handleAddToFavourite = async (bookId: string) => {
    try {
      const response = await addToFavourite(bookId);

      if (response.data.success) {
        setSnackbarMessage("Book added to favourites successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setIsFavorite(true);
      } else {
        console.error(
          "Failed to add book to favourites:",
          response.data.message
        );
        setSnackbarMessage("Failed to add book to favourites.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        setSnackbarMessage("Book is already in your favourites.");
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage(
          "An unknown error occurred while adding book to favourites."
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  console.log(isFavorite);

  const handleAddToLibrary = async (bookId: string) => {
    try {
      const response = await addToLibrary(bookId);

      if (response.data.success) {
        setSnackbarMessage("Book successfully added to your library!");
        setSnackbarSeverity("success");
      } else {
        console.error("Failed to add book to library:", response.data.message);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to add book to library.");
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        setSnackbarMessage("This book is already in your library.");
        setSnackbarSeverity("info");
      } else {
        console.error("Error adding book to library:", error);
        setSnackbarMessage(
          "An error occurred while adding the book to your library."
        );
        setSnackbarSeverity("error");
      }
    }
    setOpenSnackbar(true);
  };

  return (
    <Box className={styles.bookList}>
      {isLoading
        ? // Display Skeletons when data is loading
          Array.from(new Array(5)).map((_, index) => (
            <Box key={index} className={styles.bookItem}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={280}
                height={280}
                style={{ backgroundColor: "#f1f1f13d" }}
              />
              <Box className={styles.bookDetails}>
                <Box>
                  <Skeleton
                    variant="text"
                    width="60%"
                    animation="wave"
                    style={{ backgroundColor: "#f1f1f13d" }}
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    animation="wave"
                    style={{ backgroundColor: "#f1f1f13d" }}
                  />
                </Box>
                <Box>
                  <Skeleton
                    variant="text"
                    width="80%"
                    animation="wave"
                    style={{ backgroundColor: "#f1f1f13d" }}
                  />
                  <Skeleton
                    variant="text"
                    width="50%"
                    animation="wave"
                    style={{ backgroundColor: "#f1f1f13d" }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "16px",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={170}
                  height={36}
                  sx={{ bgcolor: "#f1f1f13d" }}
                />
                <Skeleton
                  variant="rounded"
                  width={170}
                  height={36}
                  sx={{ bgcolor: "#f1f1f13d" }}
                />
                <Skeleton
                  variant="rounded"
                  width={170}
                  height={36}
                  sx={{ bgcolor: "#f1f1f13d" }}
                />
              </Box>
            </Box>
          ))
        : // Display books when data is loaded
          bookListWithRatings.map((book) => (
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
                  <Box className={styles.ratingContainer}>
                    <Rating
                      name="read-only"
                      value={parseFloat(book.avgRating || "0")}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarBorderIcon
                          style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        />
                      }
                      sx={{
                        "& .MuiRating-iconFilled": { color: "gold" },
                        "& .MuiRating-iconEmpty": {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                        "& .MuiRating-iconHover": { color: "gold" },
                      }}
                    />
                    <Typography>{book.avgRating}</Typography>
                  </Box>
                </Box>
                <Box className={styles.boxTypography}>
                  <Typography variant="body2">Author</Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    : {getFirstAndSecondName(book.user.username)}
                    {book.user.role_id === 3 && (
                      <VerifiedIcon sx={{ color: "#448aff", height: "20px" }} />
                    )}
                  </Typography>
                  <Typography variant="body2">Category</Typography>
                  <Typography variant="body2">
                    : {book.category.name}
                  </Typography>
                  <Typography variant="body2">Age Group</Typography>
                  <Typography variant="body2">
                    : {book.agegroup.name}
                  </Typography>
                  <Typography variant="body2">Duration</Typography>
                  <Typography variant="body2">: {book.duration}</Typography>
                </Box>
              </Box>
              <Box className={styles.buttonWrapper}>
                <PrimaryButton
                  text="Listen Now"
                  onClick={() => navigate(`/book/${book.ID}`)}
                  icon={<HeadsetIcon />}
                />
                <SecondaryButton
                  text="Add to Favourite"
                  onClick={() => handleAddToFavourite(book.ID)}
                  icon={<FavoriteIcon />}
                />
                <SecondaryButton
                  text="Add to Library"
                  onClick={() => handleAddToLibrary(book.ID)}
                  icon={<BookmarkOutlinedIcon />}
                />
              </Box>
            </Box>
          ))}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookList;
