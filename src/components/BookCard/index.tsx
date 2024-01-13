import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
  Skeleton,
  Rating,
  Box,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from "react-router-dom";
import { BookCardProps } from "../../types";
import styles from "./BookCard.module.scss";

const BookCard: React.FC<BookCardProps> = ({ id, title, imageUrl, category, avgRating, author, iconRole }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => setLoading(false);
  }, [imageUrl]);

  const handleClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <Card sx={{ backgroundColor: "transparent" }} className={styles.bookCard}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          className={styles.bookCardMedia}
          sx={{ bgcolor: "#15202B" }}
        />
      ) : (
        <CardMedia
          component="img"
          className={styles.bookCardMedia}
          image={imageUrl}
          alt={title}
          onClick={handleClick}
        />
      )}
      <CardContent className={styles.bookCardContent}>
        <Box className={styles.boxRating}>
          <Rating
            name="read-only"
            value={avgRating || 0}
            readOnly
            precision={0.1}
            emptyIcon={
              <StarBorderIcon
                style={{ color: "rgba(255, 255, 255, 0.5)" }}
              />
            }
            sx={{
              "& .MuiRating-iconFilled": { color: "gold" },
              "& .MuiRating-iconEmpty": { color: "rgba(255, 255, 255, 0.5)" },
              "& .MuiRating-iconHover": { color: "gold" },
              marginRight: '5px'
            }}
          />
          <Typography className={styles.ratingNumber}>
            {avgRating ? `${avgRating}` : "0"}
          </Typography>
        </Box>
        <Tooltip title={title} placement="top" arrow>
          <Typography
            onClick={handleClick}
            variant="h6"
            component="div"
            className={styles.title}
          >
            {title}
          </Typography>
        </Tooltip>

        <Box sx={{ display: 'flex' }}>
          <Typography variant="body2" className={styles.author}>
            {author}
          </Typography>
          {iconRole === 3 && (
            <Tooltip title="Verified" placement="right">
              <VerifiedIcon sx={{ color: "#448aff", height: "20px" }} />
            </Tooltip>
          )}
        </Box>

        <Typography variant="body2" className={styles.category}>
          {category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
