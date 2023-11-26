import Navbar from '../../components/Navbar'
import Dashboard from '../../components/Dashboard'
import { useEffect, useState } from 'react';

export const ExpenseVouge = () => {  
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const [isTablet, setTablet] = useState(window.innerWidth > 768);
  const [isMobile, setMobile] = useState(window.innerWidth > 640);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1024);
    setTablet(window.innerWidth > 768);
    setMobile(window.innerWidth > 640);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  
    return (
        <main className="h-screen w-screen flex flex-row justify-evenly items-center bg-black">
            <section className=''>
               {isDesktop && <Navbar />}
            </section>
            <section className="main-cont">
                <Dashboard />
            </section>
        </main>
    );
}