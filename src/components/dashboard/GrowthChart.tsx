import { motion } from "framer-motion"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts"




// dummy data 
const data = [
    { name: "Mon", subscribers: 0.2 },
    { name: "Tue", subscribers: 0.4 },
    { name: "Wed", subscribers: 0.3 },
    { name: "Thu", subscribers: 0.8 },
    { name: "Fri", subscribers: 0.6 },
    { name: "Sat", subscribers: 0.9 },
    { name: "Sun", subscribers: 1.0 },
]




export function GrowthChart() {


    return (


        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col p-6 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[400px]"
        >


            <div className="mb-6">
                <h3 className="text-lg font-bold">Subscriber Growth <span className="text-sm font-normal text-muted-foreground">(last 30 days)</span></h3>
            </div>


            <div className="flex-1 w-full h-full min-h-[300px]">


                <ResponsiveContainer width="100%" height="100%">


                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>


                        <defs>
                            <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1C8D73" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#1C8D73" stopOpacity={0} />
                            </linearGradient>
                        </defs>


                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />


                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                            dy={10}
                        />


                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                        />


                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                            itemStyle={{ color: 'var(--foreground)' }}
                        />


                        <Area
                            type="monotone"
                            dataKey="subscribers"
                            stroke="#1C8D73"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSubscribers)"
                            activeDot={{ r: 6, fill: "#1C8D73", stroke: "var(--background)", strokeWidth: 2 }}
                        />


                    </AreaChart>


                </ResponsiveContainer>


            </div>


        </motion.div>


    )


}
