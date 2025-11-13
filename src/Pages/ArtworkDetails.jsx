import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router';
import AuthContext from '../Contexts/AuthContext/AuthContext';

const ArtworkDetails = () => {
    const data = useLoaderData(); // Artwork data loaded from DB
    const [likes, setLikes] = useState(data.likes || 0);
    const [isFavorite, setIsFavorite] = useState(false);
    const {favorite,setFavorite}=useContext(AuthContext)

    // Handle Like Button
    const handleLike = async () => {
        try {
            // Send a request to your backend to update likes
            // Example: PATCH /artworks/:id/like
            const response = await fetch(`https://artify-server-chi.vercel.app/artworks/${data._id}/likes`, {
                method: 'PATCH',
            });

            if (!response.ok) throw new Error('Failed to like artwork');

            setLikes(likes + 1);
            toast.success('You liked this artwork!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Handle Add to Favorites
    const handleAddToFavorites = async () => {
        const updatedFavorites = [...favorite, data._id];
        setFavorite(updatedFavorites),
        setIsFavorite(true)
    };

    return (
        <div className="max-w-6xl mx-auto px-4 mt-10">
            {/* Artwork Section */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full rounded-xl shadow-lg"
                    />

                    <div className="mt-4">
                        <h2 className="text-3xl font-bold text-gray-600 mb-2">{data.title}</h2>
                        <p className="text-gray-600 mb-1">
                            <strong>Artist:</strong> {data.user_name}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Medium/Tools:</strong> {data.medium}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Description:</strong> {data.description}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Category:</strong> {data.category}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Dimensions:</strong> {data.dimensions}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Price:</strong> ${data.price}
                        </p>

                        {/* Buttons */}
                        <div className="mt-4 flex gap-4">
                            <button
                                onClick={handleLike}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                            >
                                ❤️ Like ({likes})
                            </button>

                            <button
                                onClick={handleAddToFavorites}
                                disabled={isFavorite}
                                className={`px-4 py-2 rounded-md transition ${isFavorite
                                        ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                            >
                                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Artist Info Section */}
                <div className="md:w-1/3 bg-gray-100 rounded-xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Artist Info</h3>
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={data.user_photo || "https://i.pravatar.cc/150?u=artify_user"}
                            alt={data.user_name}
                            className="w-24 h-24 rounded-full object-cover shadow-md"
                        />
                        <h4 className="text-xl font-semibold">{data.user_name}</h4>
                        <p className="text-gray-600">
                            Total Artworks: {data.total_artworks || 1}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetails;
