import Planet from '../components/Planet';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VideoTextBlockFirst from '../components/VideoTextBlockFirst';
import VideoTextBlockSecond from '../components/VideoTextBlockSecond';
import React from "react";

const Home: React.FC = () => {
    return (
        <div className="relative w-full">
            <Navbar />
            <div className="h-screen relative">
                <Planet />
                <HeroSection />
            </div>
            <VideoTextBlockFirst />
            <VideoTextBlockSecond />
        </div>
    );
}

export default Home;