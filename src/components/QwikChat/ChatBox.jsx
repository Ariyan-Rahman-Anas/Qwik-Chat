"use client";

import {
  Phone,
  Video,
  Info,
  Plus,
  Camera,
  Images as LucideImage,
  Mic,
  ThumbsUp,
  SendHorizontal,
  Smile,
  PanelRightClose,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import EmojiPickerReact from '@/components/ui/EmojiPickerReact';
import { doc, onSnapshot, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useChatStore } from '@/app/lib/chatStore';
import Image from 'next/image';
import { db } from '@/app/firebase/firebase';
import { useUserStore } from '@/app/lib/userStore';
import upload from "@/app/firebase/upload";


export default function ChatBox({ toggleDetails, openDetails }) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [img, setImg] = useState({ file: null, url: '' });
  const [chat, setChat] = useState(null);
  const { currentUser } = useUserStore()
  const { chatId, user, isCurrentUserBlocked , isReceiverBlocked } = useChatStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);


  useEffect(() => {
    console.log("Current chatId user:", user, chatId);  // Debugging line
    if (chatId) {
      const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
        setChat(res.data());
      });

      return () => unSub();
    }
  }, [chatId]);


  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleEmojiClick = (event) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
    setOpenEmojiPicker(false);
  };



  ///

  const handleSend = async () => {
    if (message === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          message,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = message;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    finally {
      setImg({
        file: null,
        url: "",
      });

      setMessage("");
    }
  }


    return (
<div className="flex justify-center items-center h-screen bg-gray100">
  {/* ChatBox Wrapper */}
  <div className="flex flex-col w-full h-[100vh] shadow overflow-hidden">


    {/* Top Div - Header */}
    <div className="h-[10vh] shadow rounded-b-md px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
          <Image
                width="35"
                height="35"
                src={user?.avatar}
                alt="message image"
            quality={100}
                className='w-10 h-10 rounded-full border border-primary group-hover:opacity-60 duration-500'
              />
        <div>
          <h1 className="font-medium">{user?.username} </h1>
          <h1 className="text-xs text-gray-500">Active now</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Phone strokeWidth={2} size={20} color="#0861f2" className="cursor-pointer" />
        <Video strokeWidth={2} size={20} color="#0861f2" className="cursor-pointer" />
        <div className="relative">
          <div className={`transition-opacity duration-300 ${openDetails ? 'opacity-0' : 'opacity-100'}`}>
            <Info
              strokeWidth={2}
              size={20}
              color="#0861f2"
              className={`cursor-pointer transform transition-transform duration-500 ${openDetails ? 'rotate-180' : 'rotate-0'}`}
              onClick={toggleDetails}
            />
          </div>
          <div className={`absolute inset-0 transition-opacity duration-300 ${openDetails ? 'opacity-100' : 'opacity-0'}`}>
            <PanelRightClose
              strokeWidth={2}
              size={20}
              color="#0861f2"
              className={`cursor-pointer transform transition-transform duration-500 ${openDetails ? 'rotate-0' : '-rotate-180'}`}
              onClick={toggleDetails}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Middle Div - Messages */}
    <div className="flex-1 overflow-y-auto p-4">
      {chat?.messages?.map((message) => (
        <div
          key={message?.createdAt.toMillis()}
          className={`mb-4 ${message?.senderId === currentUser?.id ? 'ml-auto text-right' : 'mr-auto text-left'} max-w-xs`}
        >
          <div className={`inline-block px-4 py-2 rounded-lg ${message?.senderId === currentUser?.id ? 'bg-primary text-secondary ' : 'bg-gray-200'}`}>
            {message.img && (
              <Image
                width="25"
                height="25"
                src={message?.img}
                alt="message image"
                className="mb-2 rounded-full"
              />
            )}
            <p>{message.message}</p>
          </div>
        </div>
      ))}
      {img.url && (
        <div className="ml-auto mb-4 max-w-xs text-right">
          <div className="inline-block px-4 py-2 rounded-lg bg-blue-200">
            <Image width="25" height="25" src={img.url} alt="message image" className="mb-2 rounded-full" />
          </div>
        </div>
      )}
      <div ref={endRef}></div>
    </div>

    {/* Bottom Div - Input */}
    <div className="h-[10vh] border-t rounded-t-lg px-4 py-2 flex items-center gap-4">
      <div className="flex items-center gap-4">
        <Plus strokeWidth={2} size={20} color="#0861f2" className="cursor-pointer" />
        <Camera strokeWidth={2} size={18} color="#0861f2" className="cursor-pointer" />
        <label htmlFor="file">
          <LucideImage strokeWidth={2} size={18} color="#0861f2" className="cursor-pointer" />
        </label>
        <input 
         type="file"
         id="file" 
         style={{ display: 'none' }} 
         onChange={handleImg} 
          disabled={isCurrentUserBlocked || isReceiverBlocked}
         />
        <Mic strokeWidth={2} size={18} color="#0861f2" className="cursor-pointer" />
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="relative w-full">
          <input
            type="text"
            name="message"
            // placeholder="Type message..."
            placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You can not send message🚫" : "Type message..." }
            className="rounded-full py-1 px-3 pr-8 w-full focus:outline-primary placeholder:text-sm dark:text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <Smile
            onClick={() => setOpenEmojiPicker((prev) => !prev)}
            strokeWidth={2}
            size={20}
            color="#0861f2"
            className="absolute top-1.5 right-2 cursor-pointer transition-transform transform hover:scale-110"
          />
          <EmojiPickerReact open={openEmojiPicker} onEmojiClick={handleEmojiClick} />
        </div>
        <div className="relative w-6 h-6">
          <div
            className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${message.trim() ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-100'}`}
          >
            <ThumbsUp
              strokeWidth={2}
              size={20}
              color="#0861f2"
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${message.trim() ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
          >
            <SendHorizontal
              strokeWidth={2}
              size={20}
              color="#0861f2"
              onClick={handleSend}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
  }