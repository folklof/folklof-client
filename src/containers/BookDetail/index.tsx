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
import { format } from "date-fns";

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
          backgroundColor: "rgba(242, 242, 242, 0.9)",
          borderRadius: "10px",
          color: "black",
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{ textAlign: "center" }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontSize: "1.7rem",
            }}
          >
            Book Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          className={styles.accordionDetails}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              color: "white",
            },
            display: "flex",
            gap: "5vw",
          }}
        >
          {bookDetails ? (
            <>
              <Box
                sx={{
                  "& .MuiInputBase-input": {
                    border: "none",
                    width: "33vw",
                    fontSize: "1.3rem",
                    color: "black",
                    "@media (max-width: 768px)": {
                      fontSize: "1.2rem",
                      width: "60vw"
                    },
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
                  "& .MuiInputBase-input": {
                    border: "none",
                    textAlign: "center",
                    marginTop: "-7px",
                    fontSize: "1.2rem",
                    color: "black",
                  },
                }}
              >
                <Box>
                  <img
                    className={styles.coverImage}
                    src={bookDetails?.cover_image}
                    alt={`cover image ${bookDetails.title}`}
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
