import React from "react";
import { Box, Typography } from "@mui/material";

const AboutUs: React.FC = () => {
  return (
    <Box sx={{
      padding: "10vh",
      "@media (max-width: 768px)": {
        padding: "5vh 2vh",
      }
    }}>
      <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
        About Us
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "white", textAlign: "justify", padding: "2vw 5vw" }}
        paragraph
      >
        Welcome to Folklof, where innovation meets education! Our platform is a
        groundbreaking solution in the field of education, integrating AI-based
        storytelling technology with interactive reading experiences for
        children. In the fast-paced era of globalization and technology, quality
        education is the key to achieving Sustainable Development Goals (SDGs)
        and advancing the world's civilization.
        <Typography variant="h6" sx={{ mb: 4, mt: 4 }}>
          At Folklof, our mission is to provide access to high-quality learning
          resources for children from diverse backgrounds. We focus on fostering
          literacy, creativity, and inclusivity through tailor-made stories that
          captivate the imagination. Our platform strives to overcome
          educational challenges, such as limited access to quality reading
          materials and the need for more engaging learning methods.
        </Typography>
        We envision a future where every child has access to enriching
        educational content, sparking a love for learning and exploration. By
        customizing stories to each child's needs and interests, we not only
        enhance literacy skills but also inspire children to discover the world
        through imagination.
      </Typography>
    </Box>
  );
};

export default AboutUs;
