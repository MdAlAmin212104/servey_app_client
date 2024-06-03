import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../Firebase/FirebaseConfig'
import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider } from "firebase/auth/web-extension";

export const AuthProvider = createContext(null)
const Provider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const userLogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password) 
    } 

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const facebookLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, facebookProvider)
    }

    const logout = ()=> {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unSubscribe()
        };
    }, [])


    const authInfo = {
        user,
        loading,
        userLogIn,
        googleLogin,
        logout,
        createUser,
        updateUserProfile,
        facebookLogin,

    }
    return (
        <AuthProvider.Provider value={authInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

export default Provider;