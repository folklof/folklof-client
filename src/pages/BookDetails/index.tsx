import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { TopNavbar, DashboardNavbar, AudioBookPlayer, Quiz, Footer } from '../../components';
import { ReviewList, FeedbackForm } from '../../containers';

const BookDetails: React.FC = () => {
  const { id: bookId } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [refreshReviews, setRefreshReviews] = useState(false);

  const handleNewReview = useCallback(() => {
    setRefreshReviews(prev => !prev);
  }, []);

  return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <AudioBookPlayer />
      {bookId && <Quiz bookId={bookId} />}
      {bookId && <FeedbackForm bookId={bookId} onNewReview={handleNewReview} />}
      {bookId && <ReviewList key={bookId} bookId={bookId} refresh={refreshReviews} />}    
      <Footer />
    </>
  );
}

export default BookDetails;
