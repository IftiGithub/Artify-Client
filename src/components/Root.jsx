import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>

            <Toaster position="top-center" />
        </div>
        
    );
};

export default Root;