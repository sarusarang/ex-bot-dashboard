import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";




export default function NotFound() {


    return (


        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden isolate">


            {/* Background mesh/glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />


            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative flex flex-col items-center z-10"
            >


                {/* Floating 404 Number */}
                <motion.div
                    animate={{
                        y: [-5, 5, -5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative mb-6"
                >
                    <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-white/20 select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        404
                    </h1>
                </motion.div>



                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col items-center mb-10 text-center"
                >
                    <h2 className="text-2xl font-bold tracking-widest text-[#1C8D73] uppercase mb-3">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                        The page you are looking for does not exist or has been moved.
                    </p>
                </motion.div>



                {/* Return Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >

                    <Link
                        to="/"
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#1C8D73]/10 hover:bg-[#1C8D73]/20 border border-[#1C8D73]/30 hover:border-[#1C8D73]/60 text-[#1C8D73] dark:text-[#20d489] rounded-full transition-all overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-[#1C8D73]/0 via-[#1C8D73]/10 to-[#1C8D73]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="font-medium tracking-wide">Return to Dashboard</span>
                    </Link>

                </motion.div>


            </motion.div>


        </div>


    );


}
