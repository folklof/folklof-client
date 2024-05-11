import { Box, Typography, Card, CardContent, Skeleton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { LoadingImages, PrimaryButton } from "../../components";
import styles from "./Login.module.scss";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/BaseURL";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const image = new Image();
    image.src = 'https://folklof.s3.ap-southeast-1.amazonaws.com/images/login-bg.webp';
    image.onload = () => setLoading(false);
  }, []);

  const handleLogin = () => {
    window.location.href = `${BASE_URL}/auth/login`;
  };

  return (
    <Box className={styles.loginPage}>
      <Box className={styles.leftContainer}>
        <Typography variant="h1" className={styles.title}>
          One-Click Adventure Awaits!
        </Typography>
        <Typography variant="h6" className={styles.subtitle}>
          Just one click with your Google account, and you're ready to embark on
          an enchanting journey through a world of starlit stories.
        </Typography>
        <LoadingImages imgUrl="https://folklof.s3.ap-southeast-1.amazonaws.com/images/login-char.webp" styleName={styles.loginImage} alt="Login image" styleName2={""} />
      </Box>

      <Box className={styles.rightContainer}>
        {loading ?
          <Skeleton className={styles.loginCard} height={"100vh"} />
          :
          <>
            <Box className={styles.imageBox}></Box>
            <Card className={styles.loginCard}>
              <CardContent className={styles.cardContent}>
                <Typography variant="h4" className={styles.signInTitle}>
                  Sign In
                </Typography>
                <PrimaryButton
                  icon={<GoogleIcon />}
                  text="Sign in with Google"
                  onClick={handleLogin}
                />
                <Typography variant="body2" className={styles.terms}>
                  By logging in to Folklof, you agree to our{" "}
                  <a href="terms-of-use">terms of use</a>.
                </Typography>
              </CardContent>
            </Card>
          </>
        }
      </Box>
    </Box>
  );
};

export default LoginPage;
