import React from 'react';
import HomeSlider from '../components/HomeSlider';
import { useLoaderData } from 'react-router';
import Featured from '../components/Featured';
import TopArtist from '../components/TopArtist';
import Community from '../components/Community';

const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <HomeSlider></HomeSlider>
            <Featured data={data}></Featured>
            <TopArtist></TopArtist>
            <Community></Community>
        </div>
    );
};

export default Home;