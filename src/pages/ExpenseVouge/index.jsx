import Navbar from '../../components/Navbar'
import Dashboard from '../../components/Dashboard'
import { Toaster } from '@/components/ui/toaster';

export const ExpenseVouge = () => { 
    return (
        <main className="h-screen w-screen flex flex-row justify-evenly items-center bg-black">
            <Navbar />
            <section className="main-cont">
                <Dashboard />
                <Toaster />
            </section>
        </main>
    );
}