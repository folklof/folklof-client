import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Box className={styles.linkContainer}>
        <Link href="/about-us" color="inherit" className={styles.footerLink}>
          About Folklof
        </Link>
        <Link href="#" color="inherit" className={styles.footerLink}>
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" className={styles.footerLink}>
          Terms of Use
        </Link>
        <Link href="#" color="inherit" className={styles.footerLink}>
          Business Inquiries
        </Link>
      </Box>
      <Typography variant="body2" className={styles.copyRight}>
        © 2023 Folklof
      </Typography>
    </Box>
  );
};

export default Footer;