import React from 'react';
import { Footer, TopNavbar } from '../../components';
import { NotFound } from '../../containers';

const NotFoundPage : React.FC = () => {
    return (
    <>
      <TopNavbar />
      <NotFound />
      <Footer />
    </>
  );
}

export default NotFoundPage;