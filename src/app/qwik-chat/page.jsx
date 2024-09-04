"use client";

import ChatBox from '@/components/QwikChat/ChatBox';
import ChatList from '@/components/QwikChat/ChatList';
import Details from '@/components/QwikChat/Details';
import { useState } from 'react';

export default function QwikChatPage() {
  const [openDetails, setOpenDetails] = useState(false);

  const toggleDetails = () => {
    setOpenDetails((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-4 gap-0 max-h-screen  overflow-hidden">
      <div className="col-span-1">
        <ChatList />
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          openDetails ? 'col-span-2' : 'col-span-3'
        }`}
      >
        <ChatBox toggleDetails={toggleDetails} openDetails={openDetails} />
      </div>

      <div
        className={`transform transition-transform duration-500 ${
          openDetails
            ? 'translate-x-0 opacity-100 col-span-1'
            : 'translate-x-full opacity-0'
        } absolute top-0 right-0 bottom-0 w-1/4 mr-2 h-full`}
        style={{ overflow: 'hidden' }}
      >
        {openDetails && <Details />}
      </div>
    </div>
  );
}