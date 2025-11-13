import React from "react";
import { Link } from "react-router";

const Featured = ({ data }) => {
    if (!data) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <p className="text-center text-gray-500 text-lg mt-10">
                No artworks found.
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">
                Featured Artworks
            </h2>

            {/* Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {data.map((item, index) => (
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

                            <Link to={`details/${item._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Featured;
