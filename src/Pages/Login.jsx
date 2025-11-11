import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";
import AuthContext from "../Contexts/AuthContext/AuthContext";

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // TODO: Replace with your real backend or Firebase login logic
            signIn(formData.email, formData.password).then(res => console.log(res.user)).catch(e => console.log(e.message))
            toast.success("Login successful!");
            navigate("/"); // redirect to Home
        } catch (err) {
            toast.error(err.message || "Login failed. Try again.");
            console.error(err);
        }
    };

    const handleGoogleLogin = () => {
        // TODO: Add Google Auth logic (Firebase/Backend)
        toast("Google Login coming soon!");
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                {/* Left Section */}
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 text-gray-600">
                        Welcome back to <strong>Artify</strong> — your creative space to explore and showcase amazing artwork.
                    </p>
                </div>

                {/* Login Form */}
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <fieldset className="fieldset space-y-2">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input input-bordered"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button type="submit" className="btn btn-neutral mt-2">
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="btn btn-outline mt-2"
                            >
                                Continue with Google
                            </button>
                        </fieldset>

                        <p className="text-center mt-3 text-sm">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-blue-600 font-semibold">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
