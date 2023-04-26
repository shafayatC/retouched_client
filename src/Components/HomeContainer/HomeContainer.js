import React, { useState } from 'react';
import Home from '../Home/Home';
import ImageUpload from '../ImageUpload/ImageUpload';
import Footer from '../Footer/Footer';

const HomeContainer = () => {

    const [getDragFile, setDragFile] = useState([])
    const callBackFile=(data)=>{
        setDragFile(data); 
    }

    return (
        <>
            <Home callBackFile={callBackFile} />
            <ImageUpload dragFiles={getDragFile} />
            <Footer></Footer>
        </>
    );
};

export default HomeContainer;