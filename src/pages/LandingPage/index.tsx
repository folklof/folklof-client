import React from 'react';
import { HeroSection, FeaturesSection } from '../../containers';
import { Footer, LPNavbar } from '../../components';


const LandingPage: React.FC = () => {

    return (
        <>
        <LPNavbar />
        <HeroSection/>
        <FeaturesSection/>
        <Footer/>
        </>
        
    );
};

export default LandingPage;
