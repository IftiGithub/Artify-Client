import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import auth from '../../Utilities/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful.')
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current) => {
            setUser(current)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        createUser,
        signIn,
        user,
        updateProfile,
        logOut


    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
