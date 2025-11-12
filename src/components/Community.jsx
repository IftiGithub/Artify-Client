import React from "react";

// Sample Community Highlights Data
const highlights = [
    {
        id: 1,
        title: "Art Contest Winner",
        description: "Congratulations to Farzana Alam for winning the monthly digital art contest!",
        image: "https://i.postimg.cc/8P1jy51c/digital.jpg",
    },
    {
        id: 2,
        title: "Featured Collaboration",
        description: "Rafid Karim & Aisha Rahman collaborated on an amazing abstract series.",
        image: "https://i.postimg.cc/gkSkNHST/echos.jpg",
    },
    {
        id: 3,
        title: "Community Spotlight",
        description: "Tania Hossain shares her techniques for realistic floral painting.",
        image: "https://i.postimg.cc/g09pTSv6/bloom.jpg",
    },
];

const Community = () => {
    return (
        <section className="max-w-6xl mx-auto my-12 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Community Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {highlights.map((item) => (
                    <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Community;
