"use client"

import { useRouter } from 'next/navigation'; 
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { auth } from '@/app/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInForm = () => {
    // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();


    const handleLogin = async (data) => {
        setLoading(true)
        console.log("data are", data)
        const {  email, password } = data;
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            toast.error(error.message)
            console.log("err is ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            >
            <div className="grid gap-y-4">

                <div className="grid gap-1 relative ">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="input-field peer"
                        placeholder=" "
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    <label
                        htmlFor="email"
                        className="input-label"
                    >
                        Email
                    </label>
                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                </div>

                <div className="grid gap-1 relative ">
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Your password must be at least 8 characters",
                            },
                        })}
                        id="password"
                        name="password"
                        type="password"
                        className="input-field peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="password"
                        className="input-label"
                    >
                        Password
                    </label>
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </div>

                {
                    errors?.root?.random?.message && <p className="text-red-600">{errors?.root?.random?.message}</p>
                }
                

               <button disabled={loading} className={`${loading ? "disabled-btn" : "btn"} `} type="submit">
          Create an account
        </button>
            </div>
        </form>
    )
}
export default SignInForm;