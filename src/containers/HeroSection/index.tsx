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
        <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-a.webp" styleName= {styles.imgLeftTop} styleName2={styles.imgLeftTop2} alt="Hero image" />
        <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-b.webp" styleName= {styles.imgLeftBottom} styleName2={styles.imgLeftBottom2} alt="Hero image" />
      </Box>

      <Box className={styles.midContainer}>
        <Box className={styles.imageContainerMiddle}>
          <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heromiddle.webp" styleName= {styles.imgMiddle} styleName2={styles.imgMiddle2} alt="Hero image" />
        </Box>

        <Box className={styles.wordContainer}>
          <Typography variant="h1" className={styles.heading}>
            Unleash the Magical of Learning.
          </Typography>
          <Typography variant="h6" className={styles.subheading}>
            Empowering Every Child's Journey Through Interactive, Inclusive, and
            Creative AI-Powered Storytelling.
          </Typography>
          <Box className={styles.tryButton}>
            <PrimaryButton text="Try it now" onClick={handleTryNowClick} />
          </Box>
        </Box>
      </Box>

      <Box className={styles.imageContainerRight}>
        <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroright.webp" styleName={styles.bigHero} styleName2={styles.bigHero} alt="Hero image" />
      </Box>
    </Box>
  );
};

export default HeroSection;
