import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Header from './components/Header.jsx';
import Root from './components/Root.jsx';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: 'login',
        element: <Login></Login>

      }
    ]
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
