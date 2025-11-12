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
import Explore from './Pages/Explore.jsx';
import ArtworkDetails from './Pages/ArtworkDetails.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AddArtwork from './Pages/AddArtwork.jsx';
import MyGallery from './Pages/MyGallery.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('http://localhost:3000/artworks')
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: 'explore',
        element: <Explore></Explore>,
        loader: () => fetch('http://localhost:3000/allartworks')
      },
      {
        path: 'details/:id',
        element: <PrivateRoute>
          <ArtworkDetails></ArtworkDetails>
        </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/artworks/${params.id}`)

      },
      {
        path: 'add-artwork',
        element: <PrivateRoute>
          <AddArtwork></AddArtwork>
        </PrivateRoute>,

      },
      {
        path:'gallery',
        element:<PrivateRoute>
          <MyGallery></MyGallery>
        </PrivateRoute>
      }
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
