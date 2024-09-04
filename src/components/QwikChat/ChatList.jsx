"use client";

import { useUserStore } from '@/app/lib/userStore';
import Logo from '@/components/ui/Logo';
import { Plus, SquarePen } from 'lucide-react';
import Image from 'next/image';
import { UserModal } from './UserModal';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { AddUserModal } from './AddUserModal';
import { useChatStore } from '@/app/lib/chatStore';
import SkeletonChatItem from '@/components/ui/SkeletonChatItem';
import ChatTime from '@/components/ui/ChatTime'; 


export default function ChatList() {
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [input, setInput] = useState(""); 

  console.log("all chats are", chats)

  useEffect(() => {
    if (!currentUser?.id) {
      setLoading(false); 
      return; 
    }

    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const data = res.data();
        if (!data || !data.chats) {
          console.error("No chats found or document does not exist");
          setChats([]); // Set an empty state if there's no data
          setLoading(false);
          return;
        }

        try {
          const items = data.chats;

          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
              console.error(`User with ID ${item.receiverId} does not exist`);
              return { ...item, user: null }; // Handle missing user
            }

            const user = userDocSnap.data();
            return { ...item, user };
          });

          const chatData = await Promise.all(promises);

          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          setLoading(false); // Stop loading when data is ready
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setLoading(false); // Stop loading even if there's an error
        }
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);



  const handleSelect = async (chat) => {
    const userChats = chats.map(item=>{
      const {user, ...rest}  = item
      return rest
    })

    const chatIndex = userChats.findIndex(
      item=>item?.chatId === chat?.chatId
    )
    userChats[chatIndex].isSeen = true

    const userChatsRef = doc(db, "userChats", currentUser.id)

    try{
      await updateDoc(userChatsRef, {
        chats:userChats
      })
      changeChat(chat.chatId, chat.user);
    }catch(err){
      console.log("err is ", err)
    }
  };

  const filteredChats = chats?.filter(c=>c?.user?.username.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className="py-3 border2 space-y-3 ">
      <div className="flex items-center justify-between shadow rounded-b-lg px-4 pb-[1rem]">
        <Logo textSize="1.2rem" />
        <SquarePen strokeWidth={2} size={20} color='#0861f2' />
      </div>

      {currentUser && (
        <div className='flex items-end justify-center gap-2 p-3 w-fit mx-auto rounded-md group hover:shadow-md duration-500'>
          <Image
            src={currentUser?.avatar}
            alt='user picture'
            width={35}
            height={35}
            quality={100}
            className='w-12 h-12 rounded-full border border-primary group-hover:opacity-60 duration-500'
          />
          <UserModal title={currentUser?.username} />
        </div>
      )}

      <div className="px-3 flex items-center gap-2 border2 border-red-500">
        <input
          type="text"
          name="user"
          required
          className="px-2 block w-full py-2 text-black dark:text-secondary bg-transparent focus:bg-gray-300 dark:bg-gray-600 border-[.09rem] rounded-md shadow focus:shadow-none border-primary outline-none focus:ring-0 duration-500"
          placeholder="Search..."
          onChange={e=>setInput(e.target.value)}
        />
        <AddUserModal title={<Plus />} />
      </div>

      <div className="border2 p-3 space-y-1">
        {loading ? 
        (
          Array(4).fill(null).map((_, index) => (
            <SkeletonChatItem key={index} />
          ))
        ) : filteredChats.length > 0 ?  ( 
          filteredChats?.map((chat) => (
            <div
              key={chat?.chatId}
              onClick={() => handleSelect(chat)}
              className={`relative flex items-center gap-2 cursor-pointer p-1 border2 border-black rounded-md ${chat?.isSeen ? "hover:bg-gray-300 " : "bg-primary text-secondary hover:bg-blue-800 font-bold animate-pulse " } dark:bg-gray-700 duration-500`}
            >

              <Image
                src={chat?.user?.avatar}
                alt='user picture'
                width={50}
                height={50}
                quality={100}
                className='w-14 h-14 object-cover rounded-[100%] border border-primary group-hover:opacity-60 duration-500'
              />
              <div className="w-ful mr-2 ">
                <h1 className='font-medium'>{chat?.user?.username || 'No user available'}</h1>
                <div className="text-xs">
                     <p className={`${chat?.isSeen ? "" : "" } `}>
                  {chat?.lastMessage.slice(0,15) || `Say Hi ${chat?.user?.username.split(" ").slice(-1)[0]}`}...
                </p>
                <p className="absolute bottom-1 right-2 " >
                  <ChatTime updatedAt={chat?.updatedAt} />
                </p>
                </div>
              </div>
            </div>
          ))
        )
        : 
        <AddUserModal title={"Add Friend"}/>
      }
      </div>


    </div>
  );
}