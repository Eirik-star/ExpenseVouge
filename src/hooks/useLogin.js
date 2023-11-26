import { auth, Gprovider } from "../config/firebase-config"
import { signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { cookiesContext } from "../contexts/Cookies";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => { 
    const { setCookieAuth, removeCookieAuth, toggleLog } = useContext(cookiesContext)
    const nav = useNavigate()

    const handleSignInResult = (results) => {
        console.log(results)
        const authInfo = {
            userID: results.user.uid,
            email: results.user.email,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };
        console.log(authInfo)
        setCookieAuth('auth', authInfo, { path: '/' });
        toggleLog(true);
        nav("/")
    }
    
    const signIn = async (email, password) => {
        try {
            const results = await signInWithEmailAndPassword(auth, email, password);
            handleSignInResult(results)
        } catch (error) {
            console.error(error);
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
            console.log(authInfo)
            setCookieAuth('auth', authInfo, { path: '/' });
            toggleLog(true);
            nav("/")
        } catch(error) {
            console.error(error)
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

    return { signIn, signInWithGoogle, signUp, logOut }
}