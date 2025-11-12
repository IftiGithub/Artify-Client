import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";
import AuthContext from "../Contexts/AuthContext/AuthContext";

const Register = () => {
    const { createUser, updateProfile,googleSignIn } = useContext(AuthContext); // ✅ FIXED
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isValidPassword = (password) => {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;
        return hasUpper && hasLower && isLongEnough;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidPassword(formData.password)) {
            toast.error(
                "Password must contain uppercase, lowercase letters and be at least 6 characters long."
            );
            return;
        }

        try {
            // 1️⃣ Create user
            const userCredential = await createUser(formData.email, formData.password);
            const user = userCredential.user;

            // 2️⃣ Update profile (await ensures displayName and photoURL are set)
            await updateProfile(user, {
                displayName: formData.name,
                photoURL: formData.photoURL || "https://i.pravatar.cc/150?u=artify_user",
            });

            console.log("Registered user:", user);
            toast.success("Registration successful!");
            navigate("/"); // redirect to home
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    };


    const handleGoogleSignup = async () => {
        try{
            await googleSignIn(),
            toast.success('Successfully Signed UP with Google')
        }catch{
            toast.error("Couldn't Sign Up.")
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold mb-4">Register!</h1>
                    <p className="py-2 text-gray-600">
                        Join Artify to showcase your creativity and connect with other artists.
                    </p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <fieldset className="fieldset space-y-2">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label className="label">Photo URL</label>
                            <input
                                type="text"
                                name="photoURL"
                                className="input input-bordered"
                                placeholder="Photo URL"
                                value={formData.photoURL}
                                onChange={handleChange}
                            />

                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input input-bordered"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button type="submit" className="btn btn-neutral mt-4">
                                Register
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className="btn btn-outline mt-2"
                            >
                                Continue with Google
                            </button>
                        </fieldset>

                        <p className="text-center mt-3 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 font-semibold">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
