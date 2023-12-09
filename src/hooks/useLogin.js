import { auth, Gprovider } from "../config/firebase-config"
import { signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { cookiesContext } from "../contexts/Cookies";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => { 
    const { setCookieAuth, removeCookieAuth, toggleLog } = useContext(cookiesContext)
    const nav = useNavigate()
    const  [message, setMessage] = useState('')

    const handleSignInResult = (results) => {
        const authInfo = {
            userID: results.user.uid,
            email: results.user.email,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };
        setCookieAuth('auth', authInfo, { path: '/' });
        toggleLog(true);
        nav("/")
    }
    
    const signIn = async (email, password) => {
        try {
            const results = await signInWithEmailAndPassword(auth, email, password);
            handleSignInResult(results)
        } catch (error) {
            if(error.code === 'auth/missing-email'){
                setMessage("Enter Email Address!")
            } else if(error.code === 'auth/missing-password'){
                setMessage("Enter Password Address!")
            } else if(error.code === 'auth/invalid-email'){
                setMessage("Invalid Email!")
            }
            else console.error(error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, Gprovider);
            handleSignInResult(results);
        } catch (error) {
            console.error(error);
        }
    }
    
    const signUp = async (name, email, password) => {
        try{
            const results = await createUserWithEmailAndPassword(auth, email, password)
            const authInfo = {
                userID: results.user.uid,
                name: name,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            setCookieAuth('auth', authInfo, { path: '/' });
            toggleLog(true);
            nav("/")
        } catch(error) {
            if(error.code === 'auth/missing-email'){
                setMessage("Enter Email Address!")
            } else if(error.code === 'auth/missing-password'){
                setMessage("Enter Password!")
            } else if(error.code === 'auth/invalid-email'){
                setMessage("Invalid Email!")
            } else if(error.code === 'auth/email-already-exists'){
                setMessage("Account already exists")
            } else if(error.code === 'auth/weak-password'){
                setMessage("Password must be alteast 6 characters!")
            }
            else console.error(error)
        }
    }
    
    const logOut = () => {
        signOut(auth)
        .then(() => {
          removeCookieAuth('auth', { path: '/' })
          setTimeout(() => { nav("/login") }, 300)
          toggleLog(false)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const getMsg = () => {
        return message
    }

    return { signIn, signInWithGoogle, signUp, logOut, getMsg }
}