import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { Input } from "../../components/ui/input";





// register schema
const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must agree to the Terms of Service & Privacy Policy",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });




type RegisterFormValues = z.infer<typeof registerSchema>;




export default function Register() {



    // register form
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });



    // on submit
    const onSubmit = async (data: RegisterFormValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Register data:", data);
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
                    Create an Account
                </h1>

                <p className="text-muted-foreground text-sm">
                    Enter your details to get started with ExBot
                </p>

            </motion.div>


            {isSubmitSuccessful && (

                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="w-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-3 rounded-lg mb-6 flex items-center justify-between"
                >

                    <div className="flex items-center gap-2">

                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                        </div>

                        <span className="text-sm font-medium">Registration successful!</span>

                    </div>

                </motion.div>

            )}



            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">


                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >


                    <div className="space-y-2 relative pb-2">

                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase text-muted-foreground">
                            Name
                        </label>

                        <Input
                            type="text"
                            placeholder="John Doe"
                            icon={<User className="w-4 h-4" />}
                            error={errors.name?.message}
                            {...register("name")}
                        />

                    </div>



                    <div className="space-y-2 relative pb-2">

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



                    <div className="space-y-2 relative pb-2">

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



                    <div className="space-y-2 relative pb-4">

                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase text-muted-foreground">
                            Confirm Password
                        </label>

                        <Input
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-4 h-4" />}
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                        />

                    </div>



                    <div className="flex items-center space-x-2 relative">


                        <div className="flex items-center h-5">

                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-green-600 bg-background/50 accent-green-600 cursor-pointer"
                                {...register("terms")}
                            />

                        </div>


                        <div className="grid gap-1.5 leading-none">

                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground"
                            >

                                I agree to the{" "}

                                <Link to="#" className="text-green-600 hover:underline">
                                    Terms of Service
                                </Link>{" "}

                                &{" "}

                                <Link to="#" className="text-green-600 hover:underline">
                                    Privacy Policy
                                </Link>

                            </label>

                            {errors.terms?.message && (
                                <p className="text-xs text-destructive absolute -bottom-2">
                                    {errors.terms.message}
                                </p>
                            )}

                        </div>

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

                        <UserPlus className="w-4 h-4 mr-2" />

                        {isSubmitting ? "Signing up..." : "Sign Up"}

                    </button>

                </motion.div>


            </form>



            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full flex justify-center mt-8 text-sm text-muted-foreground"
            >

                <div className="flex items-center gap-1">

                    <span>Already have an account?</span>

                    <Link
                        to="/login"
                        className="text-green-600 hover:text-green-700 transition-colors font-medium flex items-center gap-1"
                    >
                        Login
                    </Link>

                </div>

            </motion.div>


        </div>

    );

}
