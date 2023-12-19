import React from 'react';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import styles from './FeatureCard.module.scss';
import { FeatureCardProps } from '../../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, imageAlt }) => {
  return (
    <div className={styles.featureCardContainer}>
    <Card className={styles.featureCard}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={imageAlt}
        className={styles.featureImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1" className={styles.description}>
          {description}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
};

export default FeatureCard;
