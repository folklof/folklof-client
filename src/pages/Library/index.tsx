import React, { useState } from 'react';
import { TopNavbar, DashboardNavbar, Footer } from '../../components';
import { Library } from '../../containers';

const LibraryPage: React.FC = () => {
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  
    return (
      <>
        <TopNavbar />
        <DashboardNavbar />
        <Library onLoaded={() => setIsLibraryLoaded(true)} />
        {isLibraryLoaded && <Footer />}
      </>
    );
  };
  
  export default LibraryPage;