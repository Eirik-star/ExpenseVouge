import { UserNav } from './profileCard'
import { useLogin } from '../hooks/useLogin'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import NewTransaction from './NewTransaction'
import { LogOut } from 'lucide-react'

export default function Navbar(){
    const { logOut } = useLogin()
    const { name } = useGetUserInfo()
    return(
        <header className="w-[15vw] h-[99vh] sticky left-0 top-0">
            <nav className="w-full h-full flex flex-col items-center justify-around bg-indigo-400 rounded-xl border-2 border-black">
                <div className="flex flex-col items-center gap-4">
                    <UserNav/>
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
    )
}