import React, { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent, Skeleton } from '@mui/material';
import styles from './FeatureCard.module.scss';
import { FeatureCardProps } from '../../types';


const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, imageAlt }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => setLoading(false);
  }, [imageUrl]);

  return (
    <div className={styles.featureCardContainer}>
    <Card className={styles.featureCard}>
      {loading ? (
        <Skeleton
          className={styles.featureImage}
          variant="rounded"
          sx={{ bgcolor: "#15202B" }}
        />
      ):(
        <CardMedia
          component="img"
          image={imageUrl}
          alt={imageAlt}
          className={styles.featureImage}
        />
      )}      
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
