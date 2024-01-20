import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";
import styles from "./404.module.scss";
import { PrimaryButton } from "../../components";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/dashboard");
  };
  return (
    <Box className={styles.wrapper}>
      <Container className={styles.notFoundContainer}>
        <Box className={styles.CardContainer}>
          <Typography variant="h4" className={styles.notFoundTitle}>
            Oops! This Page is Lost in a Fairy Tale (404)
          </Typography>
          <Typography variant="body1" className={styles.notFoundText}>
            It seems you've found a path that doesn't exist. Let's find our way
            back to familiar grounds.
          </Typography>

          <PrimaryButton text="Back to Home" onClick={handleButtonClick} />
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
