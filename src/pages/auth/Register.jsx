import { useLogin } from "../../hooks/useLogin"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"

export default function Register(){
    const { signUp, signInWithGoogle, getMsg } = useLogin()
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [ msg, setMsg ] = useState('')
    var nameValue, emailValue, passwordValue
    
    return(
        <div className="register-page">
            <div className="login-title">
                <h2 className="font-semibold text-2xl">Sign-Up to <span className="text-primary-400">Expense</span><span className="text-secondary-500">Vouge</span></h2>
            </div>
            <div className="login-cont">
                    <div className="login-btn group flex flex-row gap-3 justify-center items-center" onClick={signInWithGoogle}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                            <p className="group-hover:text-primary-300">Sign-Up with Google</p>
                    </div>
                <div className="flex flex-col items-center gap-3">
                    <p className="text">or</p>
                    <input 
                        type="text" 
                        placeholder="Name"
                        ref={nameRef}
                        className="inp"
                        onChange={() => nameValue = nameRef.current.value}/>
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        className="inp"
                        onChange={() =>  emailValue = emailRef.current.value}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="inp"
                        ref={passwordRef}
                        onChange={() => passwordValue = passwordRef.current.value}
                    />
                    <p className="font-thin text-red-500 text-sm italic">{msg}</p>
                    <button className="login-btn hover:bg-primary-300 mb-4" onClick={() => {
                        signUp(nameValue, emailValue, passwordValue)
                        setMsg(getMsg())
                        }} type="submit">Create account</button>
                    <p>Already have an account? <Link to="/login"><span className="text-primary-400 hover:text-primary-600 hover:underline">Login</span></Link></p>
                </div>
            </div>
        </div>
    )
}