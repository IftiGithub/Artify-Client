import React, { useState } from 'react';
import { useLoaderData } from 'react-router';

const Explore = () => {
    const data = useLoaderData();
    const [searchTerm, setSearchTerm] = useState("");

    // Filter artworks based on search term (title or artist)
    const filteredData = data?.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loader state
    if (!data) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    // No artworks found
    if (filteredData.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 mt-12">
                <input
                    type="text"
                    placeholder="Search by title or artist..."
                    className="w-full max-w-md mx-auto mb-8 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="text-center text-gray-500 text-lg mt-10">
                    No artworks found.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                All Artworks
            </h2>

            {/* Search Box */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by title or artist..."
                    className="w-full max-w-md p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-4 text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-1">
                                Artist:{" "}
                                <span className="font-medium text-gray-800">
                                    {item.user_name}
                                </span>
                            </p>
                            <p className="text-gray-500 text-sm mb-4">{item.category}</p>

                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
