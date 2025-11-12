import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user}=useContext(AuthContext)
    if(!user){
        return <Navigate to={`/login`}></Navigate>

    }
    else return children
};

export default PrivateRoute;