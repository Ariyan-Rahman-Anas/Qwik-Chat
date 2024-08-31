"use client";

import Hero from "@/components/ui/Hero";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { useUserStore } from "./lib/userStore";
import Loading from "./Loading";

export default function Home() {
  const router = useRouter();
  const {currentUser, isLoading, fetchUserInfo}  = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      console.log("user id is:", user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log("currentUser is: ", currentUser);


  if (isLoading) return <div> <Loading /> </div>
  // const currentUser = true
  
  // if (currentUser) {
  //   router.push("/qwik-chat")
  // } else {
  //   router.push("/");
  // }

  return (
    <main className="">
      <Hero />
    </main>
  );
}
