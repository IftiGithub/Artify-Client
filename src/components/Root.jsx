import React from 'react';
import Header from './Header';
import { Outlet, useNavigation } from 'react-router';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import Loading from './Loading';

const Root = () => {
    const {state}=useNavigation()
    return (
        <div>
            <Header></Header>
            {state=="loading"?<Loading></Loading>:<Outlet></Outlet>}
            <Footer></Footer>

            <Toaster position="top-center" />
        </div>
        
    );
};

export default Root;