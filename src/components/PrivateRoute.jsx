import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from './Loading';

const PrivateRoute = ({children}) => {
    const location=useLocation()
    const {user,loading}=useContext(AuthContext)
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to={`/login`} state={location}></Navigate>

    }
    else return children
};

export default PrivateRoute;