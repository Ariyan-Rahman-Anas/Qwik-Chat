import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute bottom-1 left-0 right-0 text-sm mx-auto w-fit ">
      ©all rights reserved by Qwik Chat || Developed by <Link target="_blank" href={"https://ariyanrahmananas.vercel.app"} className="hover:text-primary font-medium duration-500 " > Ariyan Rahmana Anas </Link>
    </div>
  )
}