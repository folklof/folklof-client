import React from "react";
import { Box, Typography } from "@mui/material";
import { PrimaryButton } from "../../components";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.scss";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate("/signin");
  };

  return (
    <Box className={styles.heroContainer}>
      <Box className={styles.imageContainerLeft}>
        <img
          className={styles.imgLeftTop}
          src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-a.webp"
          alt="Hero Image"
        />
        <img
          className={styles.imgLeftBottom}
          src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-b.webp"
          alt="Hero Image"
        />
      </Box>

      <Box className={styles.middContainer}>
        <Box className={styles.imageContainerMiddle}>
          <img
            className={styles.imgMiddle}
            src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heromiddle.webp"
            alt="Hero Image"
          />
        </Box>

        <Box className={styles.wordContainer}>
          <Typography variant="h1" className={styles.heading}>
            Unleash the Magical of Learning.
          </Typography>
          <Typography variant="h6" className={styles.subheading}>
            Empowering Every Child's Journey Through Interactive, Inclusive, and
            Creative AI-Powered Storytelling.
          </Typography>
          <PrimaryButton text="Try it now" onClick={handleTryNowClick} />
        </Box>
      </Box>

      <Box className={styles.imageContainerRight}>
        <img
          className={styles.bigHero}
          src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroright.webp"
          alt="Hero Image"
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
