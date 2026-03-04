import { useState } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Bot, Link2, Droplets, Activity } from "lucide-react"
import { StatCard } from "../components/dashboard/StatCard"
import { GrowthChart } from "../components/dashboard/GrowthChart"
import { WeeklyComparisonChart } from "../components/dashboard/WeeklyComparisonChart"




export default function Home() {


    const [isRefreshing, setIsRefreshing] = useState(false)


    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => setIsRefreshing(false), 1000)
    }



    // animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }




    return (


        <div className="space-y-8 pb-8">


            {/* Page Header */}
            <div className="flex items-center gap-3">

                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Dashboard Overview
                </h1>

                <button
                    onClick={handleRefresh}
                    className="p-1.5 rounded-md hover:bg-secondary/80 text-[#1C8D73] transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Refresh Dashboard"
                >

                    <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />

                </button>

            </div>




            {/* WhatsApp Summary Section */}
            <section className="bg-white/40 dark:bg-black backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 border border-gray-200 dark:border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">


                <div className="mb-6">

                    <h2 className="flex items-baseline gap-2 text-xl font-bold text-foreground">
                        WhatsApp Summary
                        <span className="text-sm font-normal text-muted-foreground">(all time)</span>
                    </h2>

                </div>


                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >

                    <StatCard
                        title="Bot"
                        value={2}
                        icon={Bot}
                        iconBgColor="bg-[#0f4d36]/20 dark:bg-[#154634]"
                        iconColor="text-[#1C8D73] dark:text-[#2ebd85]"
                        delay={0.1}
                    />


                    <StatCard
                        title="Widget"
                        value={0}
                        icon={Link2}
                        iconBgColor="bg-[#0f3d4d]/20 dark:bg-[#113a52]"
                        iconColor="text-blue-600 dark:text-[#379dec]"
                        delay={0.2}
                    />


                    <StatCard
                        title="Sequence"
                        value={0}
                        icon={Droplets}
                        iconBgColor="bg-[#0f4d36]/20 dark:bg-[#154634]"
                        iconColor="text-[#1C8D73] dark:text-[#2ebd85]"
                        delay={0.3}
                    />


                    <StatCard
                        title="Input Flow"
                        value={5}
                        icon={Activity}
                        iconBgColor="bg-indigo-900/10 dark:bg-[#201d40]"
                        iconColor="text-indigo-600 dark:text-[#8877eb]"
                        delay={0.4}
                    />


                </motion.div>


            </section>




            {/* Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                <div className="lg:col-span-2">
                    <GrowthChart />
                </div>


                <div className="lg:col-span-1">
                    <WeeklyComparisonChart />
                </div>

            </section>


        </div>


    )


}