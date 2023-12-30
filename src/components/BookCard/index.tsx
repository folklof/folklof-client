import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookCardProps } from "../../types";
import styles from './BookCard.module.scss';

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  imageUrl,
  category,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <Card  sx={{ backgroundColor: 'transparent'}} className={styles.bookCard}>
      <CardMedia
        onClick={handleClick}
        component="img"
        className={styles.bookCardMedia}
        image={imageUrl}
        alt={title}
      />
      <CardContent className={styles.bookCardContent}>
        <Tooltip title={title} placement="top" arrow>
          <Typography
            onClick={handleClick}
            gutterBottom
            variant="h6"
            component="div"
            className={styles.title}
          >
            {title}
          </Typography>
        </Tooltip>
        <Typography variant="body2" className={styles.category}>
          {category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
