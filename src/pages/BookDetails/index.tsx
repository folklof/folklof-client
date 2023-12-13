import React, { useEffect } from 'react';
import { TopNavbar, DashboardNavbar, AudioBookPlayer, Quiz, Footer } from '../../components';
import { ReviewList, FeedbackForm } from '../../containers';

const BookDetails: React.FC = () => {
    const bookTitle = "The Brave Little Star";

    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

    return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <AudioBookPlayer />
      <Quiz />
      <ReviewList bookTitle={bookTitle} />
      <FeedbackForm />
      <Footer />
    </>
  );
}

export default BookDetails;