import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext/AuthContext";
import toast from "react-hot-toast";
const MyGallery = () => {
    const { user } = useContext(AuthContext);
    const [artworks, setArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newImage, setNewImage] = useState(""); // for storing selected image (URL or file)

    useEffect(() => {
        if (!user || !user.email) return;

        setLoading(true);

        fetch("http://localhost:3000/my-artworks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch artworks");
                return res.json();
            })
            .then((data) => setArtworks(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    // ✅ Delete handler
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this artwork?");
        if (!confirmDelete) return;

        const res = await fetch(`http://localhost:3000/my-artworks/${id}`, {
            method: "DELETE",
        });

        const result = await res.json();
        if (result.success) {
            setArtworks(artworks.filter((item) => item._id !== id));
            toast.success("Artwork deleted successfully!");
        } else {
            toast.error("Failed to delete artwork.");
        }
    };

    // ✅ Update handler
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedArtwork = {
            title: form.title.value,
            category: form.category.value,
            description: form.description.value,
            image: newImage || selectedArtwork.image, // Use new image if provided
        };

        const res = await fetch(`http://localhost:3000/my-artworks/${selectedArtwork._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedArtwork),
        });

        const result = await res.json();
        if (result.success) {
            toast.success("Artwork updated successfully!");
            setArtworks(
                artworks.map((item) =>
                    item._id === selectedArtwork._id ? { ...item, ...updatedArtwork } : item
                )
            );
            setSelectedArtwork(null);
            setNewImage("");
        } else {
            toast.error("Failed to update artwork.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">My Gallery</h2>

            {artworks.length === 0 ? (
                <p className="text-center text-gray-500">You haven’t added any artworks yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {artworks.map((item) => (
                        <div key={item._id} className="bg-white shadow-md rounded-xl overflow-hidden">
                            <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.category}</p>

                                <div className="mt-4 flex justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedArtwork(item);
                                            setNewImage("");
                                        }}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {selectedArtwork && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white p-6 rounded-xl shadow-lg w-96"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-center">Update Artwork</h3>

                        <input
                            type="text"
                            name="title"
                            defaultValue={selectedArtwork.title}
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="category"
                            defaultValue={selectedArtwork.category}
                            placeholder="Category"
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <textarea
                            name="description"
                            defaultValue={selectedArtwork.description}
                            placeholder="Description"
                            className="w-full mb-3 p-2 border rounded"
                        ></textarea>

                        {/* Image update field */}
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Update Image:
                        </label>
                        <input
                            type="text"
                            placeholder="Paste new image URL"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setNewImage(e.target.value)}
                        />

                        <div className="flex justify-center mb-3">
                            <img
                                src={newImage || selectedArtwork.image}
                                alt="Preview"
                                className="w-40 h-32 object-cover rounded"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setSelectedArtwork(null)}
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-3 py-1 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyGallery;
