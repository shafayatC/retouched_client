import React from 'react';
import Home from '../Home/Home';
import ImageUpload from '../ImageUpload/ImageUpload';
import Footer from '../Footer/Footer';

const HomeContainer = () => {
    return (
        <>
            <Home />
            <ImageUpload />
            <Footer></Footer>
        </>
    );
};

export default HomeContainer;