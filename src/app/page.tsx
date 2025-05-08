import Planet from '../components/Planet';
import HeroSection from '../components/HeroSection';
import VideoTextBlockFirst from '../components/VideoTextBlockFirst';
import VideoTextBlockSecond from '../components/VideoTextBlockSecond';
import VideoTextBlockThird from '../components/VideoTextBlockThird';
import React from "react";

const Home: React.FC = () => {
    return (
        <div className="relative w-full">
            <div className="h-screen relative">
                <Planet />
                <HeroSection />
            </div>
            <VideoTextBlockFirst />
            <VideoTextBlockSecond />
            <VideoTextBlockThird />
        </div>
    );
}

export default Home;