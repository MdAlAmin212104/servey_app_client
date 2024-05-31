import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../Firebase/FirebaseConfig'
import { createContext, useEffect, useState } from "react";

export const AuthProvider = createContext(null)
const Provider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    

    const userLogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password) 
    } 

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logout = ()=> {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return () => {
            unSubscribe()
        };
    }, [])


    const authInfo = {
        userLogIn,
        user,
        loading,
        googleLogin,
        logout,

    }
    return (
        <AuthProvider.Provider value={authInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

export default Provider;