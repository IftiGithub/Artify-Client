import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../Contexts/AuthContext/AuthContext";
import '../App.css'
import toast from "react-hot-toast";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success('Successfully Logged Out.');
        } catch (error) {
            toast.error('Failed to log out. Please try again.');
            console.error(error);
        }
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="explore">Explore Artworks</NavLink></li>
            <li><NavLink to="/add-artwork">Add Artwork</NavLink></li>
            <li><NavLink to="/gallery">My Gallery</NavLink></li>
            <li><NavLink to="/favorites">My Favorites</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            {/* Left: Logo */}
            <div className="navbar-start">
                <Link
                    to="/"
                    className="btn btn-ghost normal-case text-2xl font-bold text-primary"
                >
                    🎨 Artify
                </Link>

                {/* Mobile dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow">
                        {navLinks}
                    </ul>
                </div>
            </div>

            {/* Center: Navigation Links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            {/* Right: Auth Buttons or Profile */}
            <div className="navbar-end space-x-2">
                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-neutral btn-sm">Register</Link>
                    </>
                ) : (
                    <div className="relative group">
                        <div className="btn btn-ghost btn-circle avatar cursor-pointer">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={user.photoURL || "https://i.pravatar.cc/150?u=artify_user"}
                                />
                            </div>
                        </div>

                        {/* Dropdown menu */}
                        <ul className="absolute right-0 mt-2 w-52 rounded-box bg-base-100 p-2 shadow
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transition-all duration-300">
                            <li className="text-center font-semibold">
                                {user.displayName || "Unnamed User"}
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm btn-error text-white mt-2 w-full"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
