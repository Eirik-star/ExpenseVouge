import { useState, createContext } from 'react'
import { useCookies } from 'react-cookie';

const cookiesContext = createContext(null)

function Cookies({ children }){
    const [cookiesAuth, setCookieAuth, removeCookieAuth, getCookieAuth ] = useCookies(['auth']);

    // State and functions for isLoggedIn cookie
    const [isLoggedInCookie, setIsLoggedInCookie] = useCookies(["isLoggedIn"]);
    const [isLoggedInState, setIsLoggedInState] = useState(isLoggedInCookie.isLoggedIn || false);

    const toggleLog = (e) => {
        setIsLoggedInState(e)
        setIsLoggedInCookie("isLoggedIn", e, { path: "/" });
    };


    return(
        <cookiesContext.Provider value={{ cookiesAuth, setCookieAuth, removeCookieAuth, getCookieAuth, isLoggedInState, toggleLog }}>
            {children}
        </cookiesContext.Provider>
    )
}

export { Cookies, cookiesContext }