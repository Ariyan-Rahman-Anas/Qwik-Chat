import { useUserStore } from '@/app/lib/userStore'
import Logo from '@/components/ui/Logo'
import { Plus, SquarePen } from 'lucide-react'
import Image from 'next/image';
import { UserModal } from './UserModal';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { AddUserModal } from './AddUserModal';

export default function ChatList() {

  const { currentUser } = useUserStore()
  const [chats, setChats] = useState([])
  const [addMode, setAddMode] = useState(false)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser?.id),
      async (res) => {
        const items = res?.data()?.chats || []
        console.log('items:', items); 
        const promises = items?.map(async(item)=>{
          const userDcoRef = doc(db, "users", item?.receiverId)
          const userDocSnap = await getDoc(userDcoRef)

          const user = userDocSnap?.data()
          return {...item, user}
        })
        const chatData = await Promise.all(promises)
        setChats(chatData?.sort((a,b)=>b?.updatedAt - a?.updatedAt))
    })

    return () => {
      unSub()
    }

  }, [currentUser?.id])
  console.log("chats from chat list", chats)


  return (
    <div className="py-3 border2 space-y-3 ">
      <div className="flex items-center justify-between shadow-md rounded-b-lg px-4 pb-[1rem]  ">
        <Logo textSize="1.2rem" />
        <SquarePen strokeWidth={2} size={20} color='#0861f2' />
      </div>

      {currentUser && <div className='flex items-end justify-center gap-2 p-3 w-fit mx-auto rounded-md group hover:shadow-md duration-500 '> <Image
        src={currentUser?.avatar}
        alt='user picture'
        width={35}
        height={35}
        quality={100} className='w-12 h-12 rounded-full border border-primary group-hover:opacity-60 duration-500 ' />

        <UserModal title={currentUser?.username} />

      </div>}
      <div className=" px-3 flex items-center gap-2 border2 border-red-500 ">
        <input
          type="text"
          name="user"
          required
          className=" px-2 block w-full py-2 text-black dark:text-secondary bg-transparent focus:bg-gray-300 dark:bg-gray-600  border-[.09rem] rounded-md shadow focus:shadow-none border-primary outline-none focus:ring-0 duration-500 "
          placeholder="Search..."
        />
        
        <AddUserModal title={<Plus />} />
      </div>

      {chats?.map(chat => <div key={chat?.chatId} >
          
        <Image
        src={currentUser?.avatar}
        alt='user picture'
        width={35}
        height={35}
        quality={100} className='w-12 h-12 rounded-full border border-primary group-hover:opacity-60 duration-500 ' />
        <p>{chat?.lastMessage || 'No message available'}</p>
        </div>  )}
      Chat List
    </div>
  )
}