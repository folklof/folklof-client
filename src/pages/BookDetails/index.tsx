import React from 'react';
import { TopNavbar, DashboardNavbar, AudioBookPlayer, Quiz } from '../../components';
import { ReviewList, FeedbackForm } from '../../containers';

const BookDetails: React.FC = () => {
    const bookTitle = "The Brave Little Star";

    return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <AudioBookPlayer />
      <Quiz />
      <ReviewList bookTitle={bookTitle} />
      <FeedbackForm />
    </>
  );
}

export default BookDetails;