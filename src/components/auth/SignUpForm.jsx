"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    control,
  } = useForm();
  const watchPassword = watch("password");

  // const [userRegister, { data, isSuccess, isLoading, error }] = useUserRegisterMutation();

  // const handleImageChange = (e) => {
  //     const file = e.target.files[0];

  //     if (file) {
  //         const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  //         const isValidType = validTypes.includes(file.type);
  //         const isValidSize = file.size <= 2 * 1024 * 1024; // 2 MB

  //         if (!isValidType) {
  //             setImageError("Only jpg, jpeg, and png formats are allowed.");
  //             setProfileImage(null);
  //             return;
  //         }

  //         if (!isValidSize) {
  //             setImageError("File size should not exceed 2 MB.");
  //             setProfileImage(null);
  //             return;
  //         }

  //         setImageError("");
  //         setProfileImage(file);
  //     }
  // };

  // const handleRegister = (formData) => {
  //     const payload = {
  //         name: `${formData.firstName} ${formData.lastName}`,
  //         email: formData.email,
  //         password: formData.password,
  //         password_confirmation: formData.confirmPassword,
  //         role: formData.role,
  //         phone: formData.phone,
  //         active_status: isActive,
  //         picture: profileImage
  //     }

  //     userRegister(payload);
  // }

  // useEffect(() => {
  //     if (error?.data) {
  //         toast.error(error?.data?.message);

  //         setError("root.random", {
  //             type: "random",
  //             message: `Something went wrong: ${error?.data?.message}`
  //         });
  //     }

  //     if (isSuccess && data?.data) {
  //         toast.success(data?.message);
  //         navigate("/admin/users");
  //     }
  // }, [error, setError, isSuccess, data, navigate]);

  return (
    <form
    // onSubmit={handleSubmit(handleRegister)}
    >
      <div className="grid gap-4 space-y-2">
        {/* name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-1 relative ">
            <input
              type="text"
              name="firstName"
              required
              className="input-field peer"
              placeholder=" "
            />
            <label htmlFor="firstName" className="input-label">
              First name
            </label>
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className="grid gap-1 relative ">
            <input
              type="text"
              name="lastName"
              required
              className="input-field peer"
              placeholder=" "
            />
            <label htmlFor="lastName" className="input-label">
              Last name
            </label>
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>
        </div>

{/* email */}
        <div className="grid gap-1 relative ">
          <input
            type="email"
            name="email"
            required
            className="input-field peer"
            placeholder=" "
          />
          <label htmlFor="email" className="input-label">
            Email
          </label>
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>

{/* password */}
        <div className="grid gap-1 relative ">
          <input
            type="password"
            name="password"
            required
            className="input-field peer"
            placeholder=" "
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>

        {/* date of birth and genger       */}
        <div className="space-y-4">
          {/* Date of Birth Section */}
          <div className="w-full text-gray-500">
            <label className="block text-xs mb-2">Date of birth</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-gray-500">
              <select
                className="select-btn"
                defaultValue=""
              >
                <option value="" disabled>
                  Day
                </option>
                {[...Array(31).keys()].map((day) => (
                  <option key={day + 1} value={day + 1}>
                    {day + 1}
                  </option>
                ))}
              </select>
              <select
                className="select-btn"
                defaultValue=""
              >
                <option value="" disabled>
                  Month
                </option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="select-btn"
                defaultValue=""
              >
                <option value="" disabled>
                  Year
                </option>
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender Section */}
          <div className="text-gray-500 w-full ">
            <label className="block text-xs mb-2">Gender</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="radio-btn">
                <span className="ml-2">Female</span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-radio"
                />
              </label>
              <label className="radio-btn">
                <span className="ml-2">Male</span>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-radio"
                />
              </label>
              <label className="radio-btn">
                <span className="ml-2">Custom</span>
                <input
                  type="radio"
                  name="gender"
                  value="custom"
                  className="form-radio"
                />
              </label>
            </div>
          </div>
        </div>

        <button
          className="btn"
          // disabled={isLoading}
        >
          Create an account
        </button>
      </div>
    </form>
  );
};
export default SignUpForm;