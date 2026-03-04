import { Menu, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";





function HeaderStat({ label, value, max, formatValue }: { label: string, value: number, max: number, formatValue: string }) {


    const percentage = max > 0 ? (value / max) * 100 : 0;


    // For visual purposes, we ensure at least a tiny sliver if value > 0 but percentage < 1%
    const displayPercentage = value > 0 && percentage < 1 ? 1 : percentage;


    const radius = 15;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;



    return (


        <div className="flex items-center gap-3 bg-white/40 dark:bg-[#121212]/80 backdrop-blur-2xl border border-gray-400 dark:border-white/10 px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none hover:bg-white/60 dark:hover:bg-[#1a1a1a]/90 transition-all cursor-default">


            {/* Circular Progress */}
            <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.05)] overflow-visible">


                <svg className="absolute inset-0 w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 36 36">


                    {/* Background track */}
                    <circle
                        cx="18"
                        cy="18"
                        r={radius}
                        className="stroke-[#1C8D73]/10 dark:stroke-[#1C8D73]/20 fill-transparent"
                        strokeWidth="4"
                    />


                    {/* Animated Progress Ring */}
                    <motion.circle
                        cx="18"
                        cy="18"
                        r={radius}
                        className="stroke-[#1C8D73] dark:stroke-[#20d489] fill-transparent drop-shadow-[0_0_2px_rgba(28,141,115,0.5)]"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        strokeDasharray={circumference}
                    />


                </svg>


                <div className="relative flex items-center justify-center z-10 w-full h-full">
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#1C8D73] dark:text-[#2ebd85]">
                        {Math.floor(percentage)}%
                    </span>
                </div>


            </div>



            {/* Text details */}
            <div className="flex flex-col justify-center leading-tight pr-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
                <span className="text-[13px] font-bold text-foreground">{formatValue}</span>
            </div>


        </div>



    )


}




export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {


    return (


        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border dark:border-[#1C8D73]/20 bg-white/70 dark:bg-[#060606]/80 px-4 backdrop-blur-2xl sm:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0px_4px_40px_rgba(28,141,115,0.15)] text-foreground dark:text-white transition-colors duration-300">


            <div className="flex items-center gap-4">


                <button
                    onClick={toggleSidebar}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary lg:hidden transition-colors"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Sidebar</span>
                </button>


                {/* Top metrics bar from the reference image */}
                <div className="hidden lg:flex items-center gap-4 ml-4">
                    <HeaderStat label="Subscriber" value={85} max={25000} formatValue="85/25.0K" />
                    <HeaderStat label="Message" value={0} max={100000000} formatValue="0/100.0M" />
                    <HeaderStat label="AI Token" value={0} max={2000} formatValue="0/2.0K" />
                </div>


            </div>



            <div className="flex items-center gap-4">


                <button className="relative rounded-full p-2 border border-gray-200 dark:border-white/15 text-secondary-foreground hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
                    <Bell className="h-[1.2rem] w-[1.2rem] text-orange-400" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-background"></span>
                </button>


                <AnimatedThemeToggler />


                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 hover:border-primary transition-colors cursor-pointer">

                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User profile"
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />

                </div>

            </div>

        </header>

    )

}
