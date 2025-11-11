// HomeSlider.jsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
    {
        id: 1,
        title: "Discover Stunning Digital Art",
        description: "Explore creations from talented artists worldwide.",
        image: "https://i.postimg.cc/NF00FvHz/slide1.jpg",
    },
    {
        id: 2,
        title: "Showcase Your Creativity",
        description: "Upload your own artwork and share it with the world.",
        image: "https://i.postimg.cc/NFLgY83S/slide2.jpg",
    },
    {
        id: 3,
        title: "Connect with Art Lovers",
        description: "Join a community of art enthusiasts and get inspired.",
        image: "https://i.postimg.cc/fbZDkh4x/slide3.jpg",
    },
];

const sliderVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

const HomeSlider = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const nextSlide = () => {
        setPage([page === slides.length - 1 ? 0 : page + 1, 1]);
    };

    const prevSlide = () => {
        setPage([page === 0 ? slides.length - 1 : page - 1, -1]);
    };

    // Auto-play every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [page]);

    return (
        <div className="relative w-full max-w-6xl mx-auto mt-10 h-[500px] overflow-hidden rounded-xl shadow-lg">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={slides[page].id}
                    custom={direction}
                    variants={sliderVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center text-white p-8"
                    style={{ backgroundImage: `url(${slides[page].image})` }}
                >
                    <div className="bg-black/40 p-6 rounded-lg text-center">
                        <h2 className="text-3xl font-bold mb-2">{slides[page].title}</h2>
                        <p>{slides[page].description}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default HomeSlider;
