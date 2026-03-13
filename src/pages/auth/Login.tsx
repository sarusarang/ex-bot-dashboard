import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, LogIn, Facebook } from "lucide-react";
import { Input } from "../../components/ui/input";




// login schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});



type LoginFormValues = z.infer<typeof loginSchema>;




export default function Login() {



    // login form
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginFormValues>({

        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },

    });



    // on submit
    const onSubmit = async (data: LoginFormValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Login data:", data);
    };



    return (


        <div className="w-full flex flex-col items-center">


            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="p-2"
            >

                <img src="/Fav-icon-png.png" loading="lazy" alt="ExBot-Logo" className="object-cover w-28" />

            </motion.div>



            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full text-center space-y-2 mb-8"
            >

                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Welcome Back
                </h1>

                <p className="text-muted-foreground text-sm">
                    Enter your credentials to access your ExBot dashboard
                </p>

            </motion.div>



            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">


                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >

                    <div className="space-y-2 relative">

                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase text-muted-foreground">
                            Email
                        </label>

                        <Input
                            type="email"
                            placeholder="name@example.com"
                            icon={<Mail className="w-4 h-4" />}
                            error={errors.email?.message}
                            {...register("email")}
                        />

                    </div>



                    <div className="space-y-2 pb-4 relative">

                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase text-muted-foreground">
                            Password
                        </label>

                        <Input
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-4 h-4" />}
                            error={errors.password?.message}
                            {...register("password")}

                        />

                    </div>


                </motion.div>



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-3 pt-2"
                >

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-12 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 text-white transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
                    >
                        <LogIn className="w-4 h-4 mr-2" />

                        {isSubmitting ? "Logging in..." : "Login"}

                    </button>


                    <button
                        type="button"
                        className="w-full inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-12 bg-[#1877F2] hover:bg-[#1877F2]/90 hover:shadow-lg hover:shadow-[#1877F2]/20 text-white transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
                    >
                        <Facebook className="w-4 h-4 mr-2 text-white" fill="currentColor" />
                        Login with Facebook
                    </button>

                </motion.div>


            </form>



            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full flex items-center justify-between mt-8 text-sm text-muted-foreground"
            >

                <Link
                    to="/forgot-password"
                    className="hover:text-green-600 transition-colors flex items-center gap-1 group"
                >

                    <Lock className="w-3 h-3 group-hover:animate-pulse" />
                    Reset Password

                </Link>


                <div className="flex items-center gap-1">

                    <span>Not a member?</span>

                    <Link
                        to="/register"
                        className="text-green-600 hover:text-green-700 transition-colors font-medium flex items-center gap-1"
                    >
                        Register
                    </Link>

                </div>


            </motion.div>


        </div>

    );


}
