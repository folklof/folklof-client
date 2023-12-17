import React, { useState } from 'react';
import { TopNavbar, DashboardNavbar, Footer } from '../../components';
import { Favourite } from '../../containers';



const FavouritePage: React.FC = () => {
    const [isFavouriteLoaded, setIsFavouriteLoaded] = useState(false);
    return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <Favourite onLoaded={() => setIsFavouriteLoaded(true)} />
      {isFavouriteLoaded && <Footer />}
    </>
  );
}

export default FavouritePage;