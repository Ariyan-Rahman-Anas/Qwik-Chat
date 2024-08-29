"use client"

import { useRouter } from 'next/navigation'; 
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInForm = () => {
    // const navigate = useNavigate();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();


    const handleLogin = (formData) => {
        login(formData);
    }

    // useEffect(() => {
    //     if (error?.data) {
    //         setError("root.random", {
    //             type: "random",
    //             message: error.data?.message,
    //         });

    //         toast.error(error.data?.message);
    //     }

    //     if (data && data?.data?.token) {
    //         toast.success(data?.message);
    //         // navigate("/exams");
    //         router.push('/new-page');
    //     }
    // }, [data, error, router, setError]);

    return (
        <form
            // onSubmit={handleSubmit(handleLogin)}
            >
            <div className="grid gap-y-4">

                <div className="grid gap-1 relative ">
                    <input
                        type="email"
                        name="email"
                        required
                        className="input-field peer"
                        placeholder=" "
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
                

                <button
                    className='btn'
                    
                // disabled={isLoading}
                >
                    Login
                </button>
            </div>
        </form>
    )
}
export default SignInForm;