import { motion } from "framer-motion"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"



// dummy data 
const data = [
    { name: "Current Week", value: 75, color: "#1C8D73" },
    { name: "Previous Week", value: 25, color: "#a1a1aa" },
]




export function WeeklyComparisonChart() {


    return (


        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col p-6 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[400px] items-center justify-between"
        >


            <div className="w-full mb-2">
                <h3 className="text-lg font-bold">Subscriber Weekly Comparison</h3>
            </div>


            <div className="relative w-full h-[250px] flex items-center justify-center">


                <ResponsiveContainer width="100%" height="100%">


                    <PieChart>


                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={5}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>


                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                        />


                    </PieChart>


                </ResponsiveContainer>


                {/* Inner Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[#1C8D73] font-semibold text-sm">Subscribers</span>
                    <span className="text-4xl font-bold text-foreground mt-1">0</span>
                </div>


            </div>



            <div className="mt-4 text-center">


                <p className="text-sm font-medium text-foreground">From last Week</p>


                <div className="flex items-center justify-center gap-4 mt-2">


                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-3 h-3 rounded-full bg-[#1C8D73]"></span>
                        Current (75%)
                    </div>


                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-3 h-3 rounded-full bg-muted"></span>
                        Last Week (25%)
                    </div>


                </div>


            </div>


        </motion.div>


    )


}
