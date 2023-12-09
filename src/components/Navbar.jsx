import UserNav  from './profileCard'
import { useLogin } from '../hooks/useLogin'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import NewTransaction from './NewTransaction'
import { Home, LogOut, PieChart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
    const { logOut } = useLogin()
    const location = useLocation()
    const { name, profilePhoto } = useGetUserInfo()
    return(
        <>
        <header className="w-[15vw] h-[99vh] sticky left-0 top-0 hidden lg:block">
            <nav className="w-full h-full flex flex-col items-center justify-around bg-gradient-to-b from-indigo-300  to-indigo-500 rounded-xl border-2 border-black">
                <div className="flex flex-col items-center gap-4">
                    <img src={profilePhoto} className='w-16 h-16 rounded-2xl' alt="" />
                    <h1 className='font-bold'>Hello, {name}</h1>
                </div>
                <div className="w-[80%]">
                    <NewTransaction />
                </div>
                <div className="w-[80%]">
                    <button className='w-full flex flex-row items-center justify-between px-11 bg-gray-950 text-white px- py-2 rounded-lg font-semibold text-sm cursor-pointer hover:text-black hover:bg-white border-2 border-black' onClick={logOut}><LogOut height={18}/> <span>Log Out</span></button>
                </div>
            </nav>
        </header>

        {/* Mobile Navbar */}
        <div className="z-20 lg:hidden fixed bottom-2 right-2">
            <div className="w-[80%] md:w-[90%] h-16 fixed bg-black bottom-1 left-1 rounded-full">
                <ul className='w-full h-full flex items-center justify-around'>
                    <Link to='/'>
                        <Home stroke={location.pathname=='/' ? '#3F51B5' : 'white'} />
                    </Link>
                    <Link to='/chart'>
                        <PieChart stroke={location.pathname=='/chart' ? '#3F51B5' : 'white'} />
                    </Link>
                    <li>
                        <UserNav/>
                    </li>
                </ul>
            </div> 
            <div>
                <NewTransaction />
            </div>
        </div>
        </>
    )
}