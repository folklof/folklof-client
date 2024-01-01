import React from "react";
import { Box, Typography } from "@mui/material";
import { PrimaryButton, LoadingImages } from "../../components";
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
        <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-a.webp" styleName= {styles.imgLeftTop} alt="Hero image" />
        <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-b.webp" styleName= {styles.imgLeftBottom} alt="Hero image" />
      </Box>

      <Box className={styles.middContainer}>
        <Box className={styles.imageContainerMiddle}>
          <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heromiddle.webp" styleName= {styles.imgMiddle} alt="Hero image" />
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
        <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroright.webp" styleName={styles.bigHero} alt="Hero image" />
      </Box>
    </Box>
  );
};

export default HeroSection;
