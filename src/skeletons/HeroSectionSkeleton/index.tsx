import { Box, Skeleton } from "@mui/material";
import styles from "./HeroSection.module.scss"

const HeroSectionSkeleton = ()=> {
  console.log('HeroSectionSkeleton rendered');
    return (
        <Box className={styles.heroContainer}>
          <Box className={styles.imageContainerLeft}>
            {/* <img
              className={styles.imgLeftTop}
              src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-a.webp"
              alt="Hero Image"
            /> */}
            <Skeleton
                className={styles.imgLeftTop}
                variant="rounded"
                width={"15vw"}
                height={"15vw"}
                sx={{bgcolor: '#15202B'}}
            />
            {/* <img
              className={styles.imgLeftBottom}
              src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroleft-b.webp"
              alt="Hero Image"
            /> */}
            <Skeleton
                className={styles.imgLeftBottom}
                variant="rounded"
                width={"12vw"}
                height={"12vw"}
                sx={{bgcolor: '#15202B'}}
            />
          </Box>
    
          <Box className={styles.middContainer}>
            <Box className={styles.imageContainerMiddle}>
              {/* <img
                className={styles.imgMiddle}
                src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heromiddle.webp"
                alt="Hero Image"
              /> */}
              <Skeleton
                className={styles.imgMiddle}
                variant="rounded"
                width={"8vw"}
                height={"8vw"}
                sx={{bgcolor: '#15202B'}}
              />
            </Box>
    
            <Box className={styles.wordContainer}>
              {/* <Typography variant="h1" className={styles.heading}>
                Unleash the Magical of Learning.
              </Typography> */}
              <Skeleton
                className={styles.heading}
                variant="text" sx={{ fontSize: '3rem', bgcolor: '#15202B', width: '30vw' }}
              />
              <Skeleton
                className={styles.heading}
                variant="text" sx={{ fontSize: '3rem', bgcolor: '#15202B', width: '15vw' }}
              />
              {/* <Typography variant="h6" className={styles.subheading}>
                Empowering Every Child's Journey Through Interactive, Inclusive, and
                Creative AI-Powered Storytelling.
              </Typography> */}
              <div className={styles.subheadContainer}>
                <Skeleton
                  className={styles.subheading}
                  variant="text" sx={{ fontSize: '1.5rem', bgcolor: '#15202B' }}
                />
                <Skeleton
                  className={styles.subheading}
                  variant="text" sx={{ fontSize: '1.5rem', bgcolor: '#15202B' }}
                />
                <Skeleton
                  className={styles.subheading}
                  variant="text" sx={{ fontSize: '1.5rem', bgcolor: '#15202B' }}
                />
              </div>
              {/* <PrimaryButton text="Try it now" onClick={handleTryNowClick} /> */}
              <Skeleton
                variant="rounded"
                width={"15em"}
                height={45}
                sx={{bgcolor: '#15202B'}}
              />
            </Box>
          </Box>
    
          <Box className={styles.imageContainerRight}>
            {/* <img
              className={styles.bigHero}
              src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/heroright.webp"
              alt="Hero Image"
            /> */}
            <Skeleton
                className={styles.bigHero}
                variant="rounded"
                width={"35vw"}
                height={"35vw"}
                sx={{bgcolor: '#15202B'}}
              />
          </Box>
        </Box>
      );
}

export default HeroSectionSkeleton