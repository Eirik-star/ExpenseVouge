import { UserNav } from './profileCard'
import { useLogin } from '../hooks/useLogin'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import NewTransaction from './NewTransaction'
import { BarChart2, Home, LogOut, PieChart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
    const { logOut } = useLogin()
    const { name, profilePhoto } = useGetUserInfo()
    const location = useLocation()
    return(
        <>
        <header className="w-[15vw] h-[99vh] sticky left-0 top-0 hidden lg:block">
            <nav className="w-full h-full flex flex-col items-center justify-around bg-indigo-400 rounded-xl border-2 border-black">
                <div className="flex flex-col items-center gap-4">
                    <img src={profilePhoto} className='w-16 h-16 rounded-2xl' alt="" />
                    <h1 className='font-bold'>Hello, {name}</h1>
                </div>
                <div className="flex flex-col w-[80%]">
                    <NewTransaction />
                </div>
                <div className="w-[80%]">
                    <button className='w-full flex flex-row items-center justify-between px-11 bg-[#252525] text-white px- py-2 rounded-lg font-semibold text-sm cursor-pointer hover:text-black hover:bg-white border-2 border-black' onClick={logOut}><LogOut height={18}/> <span>Log Out</span></button>
                </div>
            </nav>
        </header>

        <div className="z-20 lg:hidden fixed bottom-20 right-4">
            {
                location.pathname=='/' && <NewTransaction />
            }
            <div className="w-[97%] h-16 fixed bg-[#252525] bottom-1 left-1 rounded-full">
                <ul className='w-full h-full flex justify-around items-center'>
                    <Link to='/' className='bg-white rounded-full px-2.5 py-2.5'>
                        <Home/>
                    </Link>
                    <Link to='/chart'>
                        <PieChart stroke='white'/>
                    </Link>
                    <Link to='/graph'>
                        <BarChart2 stroke='white'/>
                    </Link>
                    <li>
                        <UserNav/>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}