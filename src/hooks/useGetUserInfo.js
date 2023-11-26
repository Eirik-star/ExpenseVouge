import { useContext } from "react"
import { cookiesContext } from "../contexts/Cookies"

export const useGetUserInfo = () => {
    const { cookiesAuth } = useContext(cookiesContext)
    if(cookiesAuth.auth !== null){
        const { name, email, profilePhoto, userID, isAuth } = cookiesAuth.auth
        return { name, email, profilePhoto, userID, isAuth }
    } else {
        return {
            name: null,
            email: null,
            profilePhoto: null,
            userID: null,
            isAuth: null,
        }
    }
}