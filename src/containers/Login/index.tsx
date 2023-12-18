import { Box, Typography, Card, CardContent } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { PrimaryButton } from "../../components";
import styles from "./Login.module.scss";

const baseURL = import.meta.env.VITE_BASE_URL;

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    window.location.href = `${baseURL}/auth/login`;
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
        <img
          src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/login-char.webp"
          alt="Login image"
          className={styles.loginImage}
        />
      </Box>

      <Box className={styles.rightContainer}>
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
              <a href="#">terms of use</a>.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
