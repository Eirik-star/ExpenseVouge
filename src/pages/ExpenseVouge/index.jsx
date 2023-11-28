import Navbar from '../../components/Navbar'
import Dashboard from '../../components/Dashboard'

export const ExpenseVouge = () => { 
    return (
        <main className="h-screen w-screen flex flex-row justify-evenly items-center bg-black">
            <Navbar />
            <section className="main-cont">
                <Dashboard />
            </section>
        </main>
    );
}