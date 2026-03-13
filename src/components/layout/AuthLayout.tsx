import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";





const AuthLayout = () => {



    return (



        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden selection:bg-[#1C8D73]/30 selection:text-foreground">


            {/* Absolute Header with Theme Toggler */}
            <div className="absolute top-0 right-0 p-6 z-50">

                <AnimatedThemeToggler />

            </div>


            {/* Abstract Animated Background Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">


                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] bg-[#1C8D73]/20 dark:bg-[#20d489]/20"
                />


                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] bg-blue-500/10 dark:bg-blue-400/10"
                />


                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] bg-[#1C8D73]/15 dark:bg-[#20d489]/15"
                />


                {/* Subtle grid pattern for texture */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 dark:opacity-10" />


            </div>



            {/* Content wrapper with glassmorphism */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                
                <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl border dark:border-green-600/30 border-gray-200 rounded-3xl p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]">
                    <Outlet />
                </div>

            </motion.div>


        </div>


    );


};



export default AuthLayout;
