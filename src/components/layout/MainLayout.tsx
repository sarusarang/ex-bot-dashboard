import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../common/Sidebar"
import Header from "../common/Header"


export default function MainLayout() {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (

        <div className="flex h-screen bg-background text-foreground font-sans relative overflow-hidden">
            {/* Global Blur Background for Glassmorphism */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1C8D73]/10 dark:bg-[#1C8D73]/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[120px]" />
            </div>

            <div className="flex w-full h-full z-10 relative">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-hidden bg-white/70 dark:bg-black/40 backdrop-blur-2xl border-l border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/50 dark:via-white/20 to-transparent z-20"></div>
                    <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                    <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 custom-scrollbar relative z-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>

    )
}