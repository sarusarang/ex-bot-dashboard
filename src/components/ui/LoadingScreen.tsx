import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden isolate">
            {/* Background mesh/glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1C8D73]/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative flex flex-col items-center"
            >
                {/* Floating Logo */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative z-10 mb-8"
                >
                    <img
                        src="/dark_logo.png"
                        alt="exbot loading"
                        className="h-12 object-contain"
                        style={{ filter: "drop-shadow(0 0 20px rgba(28, 141, 115, 0.4))" }}
                    />
                </motion.div>

                {/* Futuristic Loader Bar */}
                <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-[#1C8D73]"
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{ width: "50%" }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-6 text-sm font-medium tracking-[0.2em] text-[#1C8D73]/80 uppercase"
                >
                    Loading....
                </motion.div>
            </motion.div>
        </div>
    );
}
