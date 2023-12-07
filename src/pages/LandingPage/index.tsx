import React from 'react';
import { HeroSection, FeaturesSection } from '../../containers';
import { Footer, TopNavbar } from '../../components';


const LandingPage: React.FC = () => {

    return (
        <>
        <TopNavbar/>
        <HeroSection/>
        <FeaturesSection/>
        <Footer/>
        </>
        
    );
};

export default LandingPage;
