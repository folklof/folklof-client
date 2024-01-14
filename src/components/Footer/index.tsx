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
        {/* <hr className={styles.linkSpacer}></hr> */}
        <Link href="/privacy-policy" color="inherit" className={styles.footerLink}>
          Privacy Policy
        </Link>
        {/* <hr className={styles.linkSpacer}></hr> */}
        <Link href="/terms-of-use" color="inherit" className={styles.footerLink}>
          Terms of Use
        </Link>
        {/* <hr className={styles.linkSpacer}></hr> */}
        <Link href="/our-team" color="inherit" className={styles.footerLink}>
          Our Team
        </Link>
      </Box>
      <hr className={styles.linkSpacer}></hr>
      <Typography variant="body2" className={styles.copyRight}>
        © 2023 Folklof
      </Typography>
    </Box>
  );
};

export default Footer;