import React from 'react'
import { CircleUserRound, ChevronRight, Phone, Video, Info, Plus, Camera, Images, Mic, ThumbsUp, SendHorizontal, Smile } from 'lucide-react';
import Link from 'next/link';


export default function Details() {
  return (
    <div className='col-span-1 w-full p-4 border2 border-red-600 fleflex-col items-center justify-center text-center '>
      <div className="flex flex-col w-full items-center justify-center ">
        <CircleUserRound strokeWidth={1}
          size={60}
          color='#0861f2' className='text-ceter' />
        <h1 className='text-2xl'>
          Ariyan Rahman Anas
        </h1>
        <p className='text-sm text-primary '>
          MERN Stack Developer
        </p>
        <Link href="/" className="btn-2 mt-2 " >View Profile</Link>
      </div>

      <div className='mt-5 font-medium py-4 space-y-1'>
        <Link href="/" className='group p-2 text-sm rounded-md flex items-center justify-between shadow w-full text-primary hover:bg-gray-200 duration-500 '> <p>Chat Settings   </p>   < ChevronRight strokeWidth={2}
          size={18}
          color='#0861f2'
        className="group-hover:scale-125 group-hover:ml-8  duration-300 "
        /> </Link>
        <Link href="/" className='group p-2 text-sm rounded-md flex items-center justify-between shadow w-full text-primary hover:bg-gray-200 duration-500 '> <p>Privacy and help </p>   < ChevronRight strokeWidth={2}
          size={18}
          color='#0861f2'
        className="group-hover:scale-125 group-hover:ml-8  duration-300 "
        /> </Link>
        <Link href="/" className='group p-2 text-sm rounded-md flex items-center justify-between shadow w-full text-primary hover:bg-gray-200 duration-500 '> <p>Shared media</p>   < ChevronRight strokeWidth={2}
          size={18}
          color='#0861f2'
        className="group-hover:scale-125 group-hover:ml-8  duration-300 "
        /> </Link>
        <Link href="/" className='group p-2 text-sm rounded-md flex items-center justify-between shadow w-full text-secondary bg-danger hover:bg-red-700 duration-500 '> <p>Block User</p>   < ChevronRight strokeWidth={2}
          size={18}
          color='#fff'
        className="group-hover:scale-125 group-hover:ml-8  duration-300 "
        /> </Link>
      </div>

    </div>
  )
}