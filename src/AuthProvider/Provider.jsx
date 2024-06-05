import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../Firebase/FirebaseConfig'
import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider } from "firebase/auth/web-extension";
import useAxiosNotSecure from "../hook/useAxiosNotSecure";

export const AuthProvider = createContext(null)


const Provider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const axiosNotSecure = useAxiosNotSecure()


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
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = { email : currentUser.email };
                axiosNotSecure.post('/jwt', userInfo)
                    .then(res => {
                        localStorage.setItem('access_token', res.data.token);
                        setLoading(false);
                    })
            }else{
                //remove token(if store token in the client site)
                localStorage.removeItem('access_token');
                setLoading(false);
                
            }
        });

        return () => unsubscribe;

    }, [axiosNotSecure])


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