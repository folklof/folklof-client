import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Rating,
  Button,
  Skeleton
} from "@mui/material";
import { fetchLibraryBooks, removeLibraryBook, updateLibraryStatus } from "../../api";
import { LibraryBook, LibraryProps } from "../../types";
import { PrimaryButton, SecondaryButton } from "../../components";
import HeadsetIcon from '@mui/icons-material/Headset';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./Library.module.scss";

const LibraryPage: React.FC<LibraryProps> = ({ onLoaded }) => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("all");
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLibraryBooks = async () => {
      setIsLoading(true);
      const books = await fetchLibraryBooks();
      setLibraryBooks(books);
      setIsLoading(false);
      if (onLoaded) {
        onLoaded();
      }
    };

    loadLibraryBooks();
  }, [onLoaded]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleListenNow = async (bookId: string) => {
    const bookToUpdate = libraryBooks.find(book => book.book_id === bookId && !book.is_read);
    if (bookToUpdate) {
      await updateLibraryStatus(bookToUpdate.ID, true);
      setLibraryBooks(prevBooks =>
        prevBooks.map(book =>
          book.ID === bookToUpdate.ID ? { ...book, is_read: true } : book
        )
      );
    }
    navigate(`/book/${bookId}`);
  };

  const handleFindStories = () => {
    navigate("/categories");
  };

  const handleRemoveBook = async (libraryId: string) => {
    try {
      await removeLibraryBook(libraryId);
      setLibraryBooks((prevBooks) =>
        prevBooks.filter((book) => book.ID !== libraryId)
      );
    } catch (error) {
      console.error("Error while removing book:", error);
    }
  };

  const renderBooks = () => {
    return filteredBooks.map((libraryBook) => (
      <Box key={libraryBook.ID} sx={{ display: "flex", flexWrap: "wrap", mb: 6, gap: "20px", color: "white", justifyContent: "center" }}>
        <img src={libraryBook.book.cover_image} alt={libraryBook.book.title} style={{ width: 120, height: 120, borderRadius: "10px" }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: "white" }}>{libraryBook.book.title}</Typography>
          <Rating name="read-only" value={libraryBook.book.avgRating || 0} readOnly precision={0.5} />
          <Typography variant="body2" sx={{ color: "white" }}>Duration: {libraryBook.book.duration}</Typography>
          <Typography variant="body2" sx={{ color: "white" }}>Release date: {new Date(libraryBook.book.created_date).toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "16px" }}>
          <PrimaryButton icon={<HeadsetIcon />} text="Listen Now" onClick={() => handleListenNow(libraryBook.book.ID)} />
          <SecondaryButton icon={<DeleteIcon />} text="Remove" onClick={() => handleRemoveBook(libraryBook.ID)} />
        </Box>
      </Box>
    ));
  };

  const renderSkeletons = () => {
    return [...Array(3)].map((_, index) => (
      <Box key={index} sx={{ display: "flex", mb: 2 }}>
        <Skeleton variant="rectangular" width={100} height={100} sx={{ bgcolor: "#f1f1f13d" }} />
        <Box sx={{ ml: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
          <Skeleton variant="text" width="40%" sx={{ bgcolor: "#f1f1f13d" }} />
          <Box>
            <Skeleton variant="text" width="15%" sx={{ bgcolor: "#f1f1f13d" }} />
            <Skeleton variant="text" width="15%" sx={{ bgcolor: "#f1f1f13d" }} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "16px" }}>
          <Skeleton variant="rounded" width={180} height={36} sx={{ bgcolor: "#f1f1f13d" }} />
          <Skeleton variant="rounded" width={180} height={36} sx={{ bgcolor: "#f1f1f13d" }} />
        </Box>
      </Box>
    ));
  };

  const filteredBooks = libraryBooks.filter((book) => {
    switch (tabValue) {
      case "listened":
        return book.is_read;
      case "unlistened":
        return !book.is_read;
      default:
        return true;
    }
  });

  return (
    <Box className={styles.libraryContainer}>
      <Typography variant="h5" gutterBottom className={styles.title}>
        Library
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ color: "white" }}>
        <Tab value="all" label="All titles" sx={{ textTransform: "none", color: "white" }} />
        <Tab value="listened" label="Listened" sx={{ textTransform: "none", color: "white" }} />
        <Tab value="unlistened" label="Unlistened" sx={{ textTransform: "none", color: "white" }} />
      </Tabs>
      <Box className={styles.bookListContainer}>
        {isLoading ? renderSkeletons() : filteredBooks.length > 0 ? renderBooks() : (
          <Box className={styles.noBooksContainer}>
            <Typography variant="body1" className={styles.noBooksText}>
              Build your Library
              <br />
              Add titles to your Library, then find them here.
            </Typography>
            <Button variant="outlined" onClick={handleFindStories} className={styles.findStoriesButton}>Find Stories</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LibraryPage;
