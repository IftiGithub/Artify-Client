import React from "react";

// Sample Top Artists Data
const artists = [
    { id: 1, name: "Aisha Rahman", avatar: "https://i.pravatar.cc/150?img=5", artworks: 12 },
    { id: 2, name: "Rafid Karim", avatar: "https://i.pravatar.cc/150?img=3", artworks: 9 },
    { id: 3, name: "Tania Hossain", avatar: "https://i.pravatar.cc/150?img=8", artworks: 15 },
    { id: 4, name: "Nabil Chowdhury", avatar: "https://i.pravatar.cc/150?u=artify_user", artworks: 7 },
];

const TopArtist = () => {
    return (
        <section className="max-w-6xl mx-auto my-12 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Top Artists of the Week</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {artists.map((artist) => (
                    <div key={artist.id} className="flex flex-col items-center bg-white shadow-md rounded-lg p-4">
                        <img
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <h3 className="font-semibold text-lg">{artist.name}</h3>
                        <p className="text-gray-500">{artist.artworks} artworks</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopArtist;
