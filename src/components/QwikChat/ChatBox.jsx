"use client";

import {
  CircleUserRound,
  Phone,
  Video,
  Info,
  Plus,
  Camera,
  Images,
  Mic,
  ThumbsUp,
  SendHorizontal,
  Smile,
  PanelRightClose,
} from 'lucide-react';
import { useState } from 'react';
import EmojiPickerReact from '@/components/ui/EmojiPickerReact';

export default function ChatBox({ toggleDetails, openDetails }) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmojiClick = (event) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
    setOpenEmojiPicker(false); // Close the emoji picker after selecting an emoji
  };

  return (
    <div className="shadow-md border2 border-green-500 w-full overflow-hidden relative min-h-screen ">
      <div className="top shadow-md py-2 px-4 rounded-b-lg flex items-center justify-between">
        <div className="flex items-start gap-1">
          <CircleUserRound strokeWidth={2} size={30} color="#0861f2" />
          <div>
            <h1 className="font-medium">Ariyan Rahman Anas</h1>
            <h1 className="text-xs text-gray-500">Active now</h1>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Phone
            strokeWidth={2}
            size={20}
            color="#0861f2"
            className="cursor-pointer"
          />
          <Video
            strokeWidth={2}
            size={20}
            color="#0861f2"
            className="cursor-pointer"
          />
          <div className="relative">
            <div
              className={`transition-opacity duration-300 ${openDetails ? 'opacity-0' : 'opacity-100'
                }`}
            >
              <Info
                strokeWidth={2}
                size={20}
                color="#0861f2"
                className={`cursor-pointer transform transition-transform duration-500 ${openDetails ? 'rotate-180' : 'rotate-0'
                  }`}
                onClick={toggleDetails}
              />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${openDetails ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <PanelRightClose
                strokeWidth={2}
                size={20}
                color="#0861f2"
                className={`cursor-pointer transform transition-transform duration-500 ${openDetails ? 'rotate-0' : '-rotate-180'
                  }`}
                onClick={toggleDetails}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="middle"></div>
      <div className="bottom absolute bottom-0 right-0 left-0 shadow py-2 px-4 rounded-t-lg flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Plus
            strokeWidth={2}
            size={20}
            color="#0861f2"
            className="cursor-pointer"
          />
          <Camera
            strokeWidth={2}
            size={18}
            color="#0861f2"
            className="cursor-pointer"
          />
          <Images
            strokeWidth={2}
            size={18}
            color="#0861f2"
            className="cursor-pointer"
          />
          <Mic
            strokeWidth={2}
            size={18}
            color="#0861f2"
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-1 w-full">
          <div className="relative w-full">
            <input
              type="text"
              name="message"
              placeholder="Type message..."
              className="rounded-full py-1 px-3 pr-8 w-full focus:outline-primary placeholder:text-sm dark:text-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Smile
              onClick={() => setOpenEmojiPicker((prev) => !prev)}
              strokeWidth={2}
              size={20}
              color="#0861f2"
              className="absolute top-1.5 right-2 cursor-pointer transition-transform transform hover:scale-110"
            />
            <EmojiPickerReact
              open={openEmojiPicker}
              onEmojiClick={handleEmojiClick}
            />
          </div>
          <div className="relative w-6 h-6">
            <div
              className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${message.trim()
                  ? '-translate-y-6 opacity-0'
                  : 'translate-y-0 opacity-100'
                }`}
            >
              <ThumbsUp
                strokeWidth={2}
                size={20}
                color="#0861f2"
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${message.trim()
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
                }`}
            >
              <SendHorizontal
                strokeWidth={2}
                size={20}
                color="#0861f2"
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
