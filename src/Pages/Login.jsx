import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { toast } from "react-hot-toast";
import AuthContext from "../Contexts/AuthContext/AuthContext";

const Login = () => {
  const location =useLocation();
  const from = location.state?.pathname || "/";
  const { signIn,googleSignIn } = useContext(AuthContext);
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
      const userCredential = await signIn(formData.email, formData.password);
      // Login successful
      toast.success("Login successful!");
      console.log("Logged in user:", userCredential.user);
      navigate(from);
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again."); // Login failed
    }
  };

  const handleGoogleLogin = async() => {
    // TODO: Add Google Auth logic (Firebase/Backend)
    try{
      await googleSignIn(),
      toast.success("Signed In with Google!")
      navigate(from);

    }
    catch{
      toast.error('Could not sign in')
    }
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
