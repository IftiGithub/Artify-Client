import React from 'react';
import HomeSlider from '../components/HomeSlider';
import { useLoaderData } from 'react-router';
import Featured from '../components/Featured';

const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <HomeSlider></HomeSlider>
            <Featured data={data}></Featured>
        </div>
    );
};

export default Home;