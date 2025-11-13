import React, { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext/AuthContext";
import toast from "react-hot-toast";

const AddArtwork = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddArtwork = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const artworkData = {
            image: form.image.value,
            title: form.title.value,
            category: form.category.value,
            medium: form.medium.value,
            description: form.description.value,
            dimensions: form.dimensions.value || "N/A",
            price: form.price.value ? parseFloat(form.price.value) : 0,
            visibility: form.visibility.value,
            user_name: user?.displayName || "Anonymous",
            user_email: user?.email || "Unknown",
            createdAt: new Date(),
        };

        try {
            const res = await fetch("https://artify-server-chi.vercel.app/artworks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(artworkData),
            });

            if (res.ok) {
                toast.success("Artwork added successfully!");
                form.reset();
            } else {
                toast.error("Failed to add artwork. Try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-12 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                ➕ Add Artwork
            </h2>

            <form onSubmit={handleAddArtwork} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-black">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        required
                        className="w-full border rounded-md p-2 text-black"
                        placeholder="Enter image link"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-black">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full border rounded-md p-2 text-black"
                        placeholder="Artwork title"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-black">Category</label>
                    <input
                        type="text"
                        name="category"
                        required
                        className="w-full border rounded-md p-2 text-black"
                        placeholder="Nature, Portrait, Abstract..."
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-black">Medium / Tools</label>
                    <input
                        type="text"
                        name="medium"
                        required
                        className="w-full border rounded-md p-2 text-black"
                        placeholder="Oil on canvas, Photoshop, etc."
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-black">Description</label>
                    <textarea
                        name="description"
                        required
                        className="w-full border rounded-md p-2 h-24 text-black"
                        placeholder="Describe your artwork..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1 text-black">Dimensions (optional)</label>
                        <input
                            type="text"
                            name="dimensions"
                            className="w-full border rounded-md p-2 text-black"
                            placeholder="e.g., 24 x 36 inches"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1 text-black">Price (optional)</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full border rounded-md p-2 text-black"
                            placeholder="Enter price"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1 text-black">Visibility</label>
                    <select name="visibility" required className="w-full border rounded-md p-2 text-black">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1 text-black">User Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full border rounded-md p-2 bg-gray-100 text-black"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1 text-black">User Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="w-full border rounded-md p-2 bg-gray-100 text-black"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Artwork"}
                </button>
            </form>
        </div>
    );
};

export default AddArtwork;
