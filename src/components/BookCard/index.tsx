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
    <Card
      sx={{
        maxWidth: 253,
        bgcolor: "transparent",
        borderRadius: 3,
        marginRight: "33px",
      }}
    >
      <CardMedia
        onClick={handleClick}
        component="img"
        height="250"
        image={imageUrl}
        alt={title}
        sx={{ borderRadius: 2, cursor: "pointer" }}
      />
      <CardContent>
        <Tooltip title={title} placement="top" arrow>
          <Typography
            onClick={handleClick}
            gutterBottom
            variant="h6"
            color="white"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              cursor: "pointer",
            }}
          >
            {title}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="white">
          {category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
