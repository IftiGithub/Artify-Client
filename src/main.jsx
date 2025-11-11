import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './components/Root.jsx';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Error from './Pages/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "*",
    element: <Error />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
