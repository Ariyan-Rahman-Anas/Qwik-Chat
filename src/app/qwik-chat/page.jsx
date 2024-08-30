import ChatBox from '@/components/QwikChat/ChatBox'
import ChatList from '@/components/QwikChat/ChatList'
import Details from '@/components/QwikChat/Details'
import React from 'react'

export default function QwikChatPage() {
  return (
      <div>
          <div className='grid grid-cols-4 min-h-[100vh] '>
          <ChatList />
          <ChatBox />
          <Details />
    </div>
    </div>
  )
}