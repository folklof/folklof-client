import React from "react";
import { Box, Typography } from "@mui/material";

const PrivacyPolicy: React.FC = () => {
  return (
    <Box sx={{
      padding: "10vh",
      "@media (max-width: 768px)": {
        padding: "5vh 2vh",
      }
    }}>
      <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
        Privacy Policy
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "white", textAlign: "justify", padding: "2vw 5vw" }}
        paragraph
      >
        1. Information Collected: We collect user information, including but not
        limited to, account details, preferences, and usage patterns, to enhance
        the personalized experience on our platform.
        <Typography variant="h6" sx={{ mb: 4, mt: 4 }}>
          2. Data Security: We prioritize the security of user data and employ
          industry-standard measures to protect against unauthorized access,
          disclosure, or alteration.
        </Typography>
        3. Children's Privacy: Our platform is designed for children within
        specific age ranges. We do not knowingly collect personal information
        from children without parental consent.
        <Typography variant="h6" sx={{ mb: 4, mt: 4 }}>
          4. Third-Party Services: Folklof may use third-party services, and
          their privacy policies may apply. Users are encouraged to review these
          policies.
        </Typography>
        5. Data Retention: We retain user data for the duration necessary for
        the purposes outlined in this privacy policy or as required by law.
        <Typography variant="h6" sx={{ mb: 4, mt: 4 }}>
          6. Consent: By using our platform, you consent to the terms outlined
          in this privacy policy.
        </Typography>
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;
