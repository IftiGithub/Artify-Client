import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
            <h1 className="text-9xl font-extrabold text-red-500 mb-6">404</h1>
            <h2 className="text-3xl font-bold mb-4">Oops! Page Not Found</h2>
            <p className="text-center text-gray-600 mb-6">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="btn btn-primary btn-lg"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default Error;