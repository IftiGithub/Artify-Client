import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import { useLoaderData } from 'react-router';

const MyFavorites = () => {
    const { favorite, setFavorite } = useContext(AuthContext); // favorite = array of artwork IDs
    const data = useLoaderData();

    // Remove artwork from favorites
    const handleUnfavorite = (id) => {
        const updatedFavorites = favorite.filter(favId => favId !== id);
        setFavorite(updatedFavorites);

        // Optional: persist in localStorage
        //localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
    };

    // Filter artworks that are in the user's favorites
    const filteredData = data.filter((item) => favorite.includes(item._id));

    if (!data) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (filteredData.length === 0) {
        return (
            <p className="text-center text-gray-500 text-lg mt-10">
                You have no favorite artworks yet.
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                My Favorite Artworks
            </h2>

            {/* Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredData.map((item) => (
                    <div
                        key={item._id}
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
                                Artist: <span className="font-medium text-gray-800">{item.user_name}</span>
                            </p>
                            <p className="text-gray-500 text-sm mb-4">{item.category}</p>

                            <button
                                onClick={() => handleUnfavorite(item._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Unfavorite
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;
