import React from 'react'
import { CircleUserRound, ChevronRight, Phone, Video, Info, Plus, Camera, Images, Mic, ThumbsUp, SendHorizontal, Smile } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/app/lib/userStore';
import { useChatStore } from '@/app/lib/chatStore';
import Image from 'next/image';
import { doc, getDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import  {ProfileModal}  from '@/components/ui/ProfileModal';

export default function Details() {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked , isReceiverBlocked, changeBlock } = useChatStore();


  const handleBlock = async ()=>{
    if(!user) return
    const userDocRef = doc(db, "users", currentUser?.id)

    try{
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    }catch(err){
      console.log("err from details ", err)
    }

  }


  return (
    <div className='col-span-1 w-full p-4 border2 border-red-600 fleflex-col items-center justify-center text-center '>
      <div className="flex flex-col w-full items-center justify-center ">

          <Image
            src={user?.avatar}
            alt='user picture'
            width={35}
            height={35}
            quality={100}
            className='w-12 h-12 rounded-full border border-primary group-hover:opacity-60 duration-500'
          />

        {/* <CircleUserRound strokeWidth={1}
          size={60}
          color='#0861f2' className='text-ceter' /> */}
        <h1 className='text-2xl'>
          {user?.username}
        </h1>
        <p className='text-sm text-primary '>
          MERN Stack Developer
        </p>
        <ProfileModal title={"View Profile"} />
        {/* <Link href="/" className="btn-2 mt-2 " >View Profile</Link> */}
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
        <button onClick={handleBlock} className='group p-2 text-sm rounded-md flex items-center justify-between shadow w-full text-secondary font-semibold bg-danger hover:bg-red-700 duration-500 '> <p>
          
          {isCurrentUserBlocked ? "You are blocked!" :  isReceiverBlocked ? "User Blocked" : "Block User"}
            </p> 
            </button>
      </div>

    </div>
  )
}  