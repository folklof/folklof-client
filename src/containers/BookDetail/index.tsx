import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./BookDetail.module.scss";
import { Box, TextField } from "@mui/material";
import { fetchBookData } from "../../api/book/bookAPI";
import React, { useEffect, useState } from "react";
import { BookAttributes } from "../../types";
import { fetchRatings } from "../../api";
import { format } from 'date-fns';


interface BookDetailProps {
  bookId: string;
}

interface BookRatingsProps {
  data: {
    avgRating?: number;
    totalBookReviews?: number;
  };
}

const BookDetail: React.FC<BookDetailProps> = ({ bookId }) => {
  const [bookDetails, setBookDetails] = useState<BookAttributes | null>(null);
  const [bookRating, setBookRatings] = useState<BookRatingsProps | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchBookData(bookId);
        setBookDetails(details);
      } catch (error) {
        console.error(`Error fetching book details for ID ${bookId}:`, error);
      }
    };

    fetchDetails();
  }, [bookId]);

  useEffect(() => {
    const fetchBookRating = async () => {
      try {
        const ratings = await fetchRatings(bookId);
        setBookRatings(ratings);
      } catch (error) {
        console.error(`error fetching book ratings for ID ${bookId}:`, error);
      }
    };
    fetchBookRating();
  }, [bookId]);

  return (
    <div className={styles.centeredContainer}>
      <Accordion
        className={styles.accordion}
        style={{
          backgroundColor: "#f1f1f13d",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{ textAlign: "center" }}
        >
          <Typography>Click for more details</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              color: "white",
            },
            display: "flex",
            gap: "2vw",
          }}
        >
          {bookDetails ? (
            <>
              <Box
                sx={{
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    border: "none",
                    color: "white",
                    width: "12vw",
                  },
                }}
              >
                <Box className={styles.bookDetailsText}>
                  <Typography className={styles.label}>Book Code</Typography>
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyTextField}
                    value={bookDetails?.book_code}
                  />
                </Box>
                <Box className={styles.bookDetailsText}>
                  <Typography className={styles.label}>Title</Typography>
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyTextField}
                    value={bookDetails?.title}
                  />
                </Box>
                <Box className={styles.bookDetailsText}>
                  <Typography className={styles.label}>Author</Typography>
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyTextField}
                    value={bookDetails?.user.username}
                  />
                </Box>
                <Box className={styles.bookDetailsText}>
                  <Typography className={styles.label}>Rating</Typography>
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyTextField}
                    value={bookRating?.data.avgRating}
                  />
                </Box>
                <Box className={styles.bookDetailsText}>
                  <Typography className={styles.label}>Duration</Typography>
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyTextField}
                    value={bookDetails?.duration}
                  />
                </Box>
                <Box className={styles.bookDetailsText}>
                  <Typography className={styles.label}>Release Date</Typography>
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyTextField}
                    value={
                      bookDetails
                        ? format(
                            new Date(bookDetails.created_date),
                            "dd/MM/yyyy"
                          )
                        : ""
                    }
                  />
                </Box>
              </Box>
              <Box
                className={styles.bookDetailsText1}
                sx={{
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    border: "none",
                    color: "white",
                    textAlign: "center",
                    marginLeft: "10px",
                    marginTop: "-12px",
                  },
                }}
              >
                <Box>
                  <img
                    src={bookDetails?.cover_image}
                    alt=""
                    style={{
                      width: "21vh",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyText}
                    value={bookDetails?.category.name}
                  />
                  <TextField
                    InputProps={{ readOnly: true }}
                    className={styles.readOnlyText}
                    value={bookDetails?.agegroup.name}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <p>Loading book details...</p>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BookDetail;
