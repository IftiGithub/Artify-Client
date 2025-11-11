// HomeSlider.jsx
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const slides = [
  {
    original: "https://i.postimg.cc/NF00FvHz/slide1.jpg",
    thumbnail: "https://i.postimg.cc/NF00FvHz/slide1.jpg",
    title: "Discover Stunning Digital Art",
    description: "Explore creations from talented artists worldwide.",
  },
  {
    original: "https://i.postimg.cc/NFLgY83S/slide2.jpg",
    thumbnail: "https://i.postimg.cc/NFLgY83S/slide2.jpg",
    title: "Showcase Your Creativity",
    description: "Upload your own artwork and share it with the world.",
  },
  {
    original: "https://i.postimg.cc/fbZDkh4x/slide3.jpg",
    thumbnail: "https://i.postimg.cc/fbZDkh4x/slide3.jpg",
    title: "Connect with Art Lovers",
    description: "Join a community of art enthusiasts and get inspired.",
  },
];

// Custom render function to center description
const renderCenteredDescription = (item) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 text-white p-6">
      <h2 className="text-3xl font-bold mb-2 drop-shadow-md">{item.title}</h2>
      <p className="max-w-xl text-base md:text-lg">{item.description}</p>
    </div>
  );
};

const HomeSlider = () => {
  return (
    <div className="relative max-w-6xl mx-auto mt-10 rounded-xl overflow-hidden shadow-lg">
      <ImageGallery
        items={slides}
        autoPlay={true}
        showPlayButton={false}
        showFullscreenButton={false}
        slideInterval={4000}
        showThumbnails={false}
        showBullets={true}
        infinite={true}
        renderItem={(item) => (
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <img
              src={item.original}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {renderCenteredDescription(item)}
          </div>
        )}
      />
    </div>
  );
};

export default HomeSlider;
