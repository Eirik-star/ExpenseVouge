import { useLogin } from "../../hooks/useLogin"

export default function Logout(){
    const { logOut } = useLogin()
    // const logout = () => {
    //     signOut(auth)
    //     .then(() => {
    //       removeCookieAuth('auth', { path: '/' })
    //       setTimeout(() => { nav("/login") }, 300)
    //       toggleLog(false)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
    
    return(
        <button onClick={logOut}>Logout</button>
    )
}