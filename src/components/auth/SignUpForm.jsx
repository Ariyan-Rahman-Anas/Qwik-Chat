"use client";

import {  useState } from "react";
import {  useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../app/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "@/app/firebase/upload";


const SignUpForm = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState({ file: null, url: "" });
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    control,
  } = useForm();
  const watchPassword = watch("password");

  const handleProfileImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10 MB

      if (!isValidType) {
        setImageError("Only jpg, jpeg, and png formats are allowed.");
        setProfileImage({ file: null, url: "" });
        return;
      }

      if (!isValidSize) {
        setImageError("File size should not exceed 2 MB.");
        setProfileImage({ file: null, url: "" });
        return;
      }

      setImageError("");
      setProfileImage({
        file,
        url: URL.createObjectURL(file),
      });
    } else {
      setImageError("Please select an image.");
      setProfileImage({ file: null, url: "" });
    }
  };

  const handleSignUp = async (data) => {
    setLoading(true)
    const { firstName, lastName, email, password, day, month, year, gender } = data;

    // Validate image before proceeding
    if (!profileImage.file) {
      setImageError("Please select an image.");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const isValidType = validTypes.includes(profileImage.file.type);
    const isValidSize = profileImage.file.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      setImageError("Only jpg, jpeg, and png formats are allowed.");
      return;
    }

    if (!isValidSize) {
      setImageError("File size should not exceed 10 MB.");
      return;
    }

    try {
      // Proceed with Firebase Authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgURL =  await upload(profileImage.file)
      // After successful authentication, process the rest of the form data
      const formData = new FormData();
      const dateOfBirth = `${year}-${month}-${day}`;
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("gender", gender);
      formData.append("profileImage", profileImage.file);

      // You can now send `formData` to your backend for further processing
      await setDoc(doc(db, "users", res.user.uid), {
        username: `${firstName} ${lastName}`,
        email,
        avatar: imgURL,
        id: res.user.uid,
        blocked: []
      } )
      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: []
      } )
      console.log("Firebase response:", res);

      console.log("Form Data:", Object.fromEntries(formData.entries()));
      toast.success("Account created successfully!");
      // router.push("/qwik-chat");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
          toast.error("This Email is already registered!😑");
      }
      console.error("Error during sign-up:", error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="grid gap-4 space-y-2">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-1 relative">
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
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
          <div className="grid gap-1 relative">
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
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

        {/* Profile Image */}
        <div className="grid gap-1">
          <div className="flex items-center">
            <label htmlFor="picture" className="text-gray-500 text-sm">
              Profile picture
            </label>
          </div>
          <input
            {...register("picture")}
            id="picture"
            name="picture"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            className="input-field peer"
            onChange={handleProfileImage}
          />
          {imageError && <span className="text-red-600">{imageError}</span>}
        </div>

        {/* Email */}
        <div className="grid gap-1 relative">
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
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

        {/* Password */}
        <div className="grid gap-1 relative">
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            className="input-field peer"
            placeholder=" "
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>

        {/* Date of Birth and Gender */}
        <div className="space-y-4">
          {/* Date of Birth Section */}
          <div className="w-full text-gray-500">
            <label className="text-sm mb-1">Date of birth</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-gray-500">
              <select
                {...register("day", { required: "Day is required" })}
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
                {...register("month", { required: "Month is required" })}
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
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                {...register("year", { required: "Year is required" })}
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
          <div className="text-gray-500 w-full">
            <label className="text-sm mb-1">Gender</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="radio-btn">
                <span className="ml-1">Female</span>
                <input
                  type="radio"
                  {...register("gender", { required: "Gender is required" })}
                  value="female"
                  className="form-radio"
                />
              </label>
              <label className="radio-btn">
                <span className="ml-1">Male</span>
                <input
                  type="radio"
                  {...register("gender", { required: "Gender is required" })}
                  value="male"
                  className="form-radio"
                />
              </label>
              <label className="radio-btn">
                <span className="ml-1">Custom</span>
                <input
                  type="radio"
                  {...register("gender", { required: "Gender is required" })}
                  value="custom"
                  className="form-radio"
                />
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-600">{errors.gender.message}</span>
            )}
          </div>
        </div>

        <button disabled={loading} className={`${loading ? "disabled-btn" : "btn"} `} type="submit">
          {loading ? "Creating..." : "Create an account"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;