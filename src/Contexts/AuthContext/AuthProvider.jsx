import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from '../../Utilities/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [favorite,setFavorite]=useState([])
    const [loading,setloading]=useState(true)
    const createUser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signIn = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful.')
        }).catch((error) => {
            console.log(error)
        });
    }
    const googleProvider= new GoogleAuthProvider()
    const googleSignIn=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current) => {
            setUser(current)
            setloading(false)
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
        logOut,
        googleSignIn,
        favorite,
        setFavorite,
        loading,
        setloading


    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
