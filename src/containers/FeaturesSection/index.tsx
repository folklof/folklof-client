import React from 'react';
import { Box, Typography } from '@mui/material';
import FeatureCard from '../../components/FeatureCard';
import styles from './FeaturesSection.module.scss';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Engaging Storytelling Adventures',
      description: 'Dive into an ever-expanding universe of tales, with stories added every week to keep young minds enthralled.',
      imageUrl: 'https://folklof.s3.ap-southeast-1.amazonaws.com/images/featured-a.webp',
      imageAlt: 'Feature 1',
    },
    {
      title: 'Educational and Fun',
      description: 'Our stories are designed to educate as well as entertain, instilling a love for reading and learning.',
      imageUrl: 'https://folklof.s3.ap-southeast-1.amazonaws.com/images/featured-b.webp',
      imageAlt: 'Feature 2',
    },
    {
      title: 'Technology Meets Imagination',
      description: "Cutting-edge AI technology personalizes the reading experience, adapting to each child's learning pace and preferences.",
      imageUrl: 'https://folklof.s3.ap-southeast-1.amazonaws.com/images/featured-c.webp',
      imageAlt: 'Feature 3',
    },
  ];

  return (
    <Box className={styles.featuresSection}>
      <Typography variant="h4" className={styles.featuresTitle}>
        "Once Upon a Feature"
      </Typography>
      <Box className={styles.featuresContainer}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
            imageAlt={feature.imageAlt}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FeaturesSection;
