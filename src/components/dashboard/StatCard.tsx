import { motion } from "framer-motion"
import { type LucideIcon } from "lucide-react"



// Props Types
interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    iconBgColor?: string
    iconColor?: string
    delay?: number
}




export function StatCard({ title, value, icon: Icon, iconBgColor = "bg-[#1C8D73]", iconColor = "text-white", delay = 0 }: StatCardProps) {



    return (


        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative flex items-center justify-start gap-4 p-5 rounded-3xl bg-white/20 dark:bg-[#0c0c0c]/60 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden group cursor-pointer"
        >

            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />


            <div className="flex items-center gap-4 relative z-10 w-full">


                <div className={`flex items-center justify-center w-[52px] h-[52px] shrink-0 rounded-2xl ${iconBgColor}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>


                <div>

                    <h3 className="text-2xl font-bold tracking-tight text-foreground leading-none">
                        {value}
                    </h3>

                    <p className="text-xs font-medium text-muted-foreground mt-1.5">
                        {title}
                    </p>

                </div>

            </div>


            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />


        </motion.div>

    )

}
