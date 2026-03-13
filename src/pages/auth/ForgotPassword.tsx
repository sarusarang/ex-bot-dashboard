import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Input } from "../../components/ui/input";





// forgot password schema
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});



type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;




export default function ForgotPassword() {



    // forgot password form
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, } = useForm<ForgotPasswordFormValues>({

        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },

    });




    const onSubmit = async (data: ForgotPasswordFormValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Reset email sent to:", data.email);
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
                    Reset Password
                </h1>
                <p className="text-muted-foreground text-sm max-w-[90%] mx-auto">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
                </p>
            </motion.div>



            {isSubmitSuccessful && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-xl mb-6 flex flex-col items-center text-center gap-3"
                >
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                            ✓
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm mb-1">Link Sent Successfully</h3>
                        <p className="text-xs opacity-90">Please check your email inbox for further instructions.</p>
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

                    <div className="space-y-2 pb-4 relative">


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


                </motion.div>



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-3 pt-2"
                >


                    {!isSubmitSuccessful && (


                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-12 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 text-white transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </div>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Password Reset Link
                                </>
                            )}

                        </button>

                    )}



                    <Link
                        to="/login"
                        className="w-full inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-12 bg-secondary text-secondary-foreground hover:bg-secondary/80 transform hover:-translate-y-0.5 active:translate-y-0 duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                    </Link>


                </motion.div>


            </form>


        </div>


    );


}

