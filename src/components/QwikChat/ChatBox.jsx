import { CircleUserRound, Phone, Video, Info, Plus,Camera,  Images, Mic, ThumbsUp, SendHorizontal, Smile } from 'lucide-react'

export default function ChatBox() {
  return (
    <div className="col-span-2 shadow-md w-full overflow-hidden relative ">
      <div className="top shadow-md py-2 px-4 rounded-b-lg flex items-center justify-between ">
              <div  className="flex items-start gap-1 ">
                  <CircleUserRound strokeWidth={2} size={30} color='#0861f2' />
                  <div className="fle items-center gap-8 ">
                  <h1 className="font-medium" >Ariyan Rahman Anas</h1>
                  <h1 className="text-xs text-gray-500 " >Active now</h1>
                  </div>
                  
              </div>
              <div className="flex items-center gap-8  ">
                <Phone strokeWidth={2} size={20} color='#0861f2' className='cursor-pointer' />
              <Video strokeWidth={2} size={20} color='#0861f2'  className='cursor-pointer' />
              <Info strokeWidth={2} size={20} color='#0861f2'   className='cursor-pointer' />
                </div>
      </div>
      <div className="middle"></div>
          <div className="bottom absolute bottom-0 right-0 left-0 shadow py-2 px-4 rounded-t-lg flex items-center gap-4 ">
              
              <div className="flex items-center gap-4" >
                  <Plus strokeWidth={2} size={20} color='#0861f2'   className='cursor-pointer' />
                  <Camera strokeWidth={2} size={18} color='#0861f2'   className='cursor-pointer' />
                  <Images strokeWidth={2} size={18} color='#0861f2'   className='cursor-pointer' />
                  <Mic strokeWidth={2} size={18} color='#0861f2'   className='cursor-pointer' />
              </div>
              <div className="flex items-center gap-1 w-full "> 
                  <div className="relative w-full"  >
                    <input type="text" name="message" placeholder="Type message..." className="rounded-full py-1 px-3 pr-8 w-full focus:outline-primary placeholder:text-sm " />
                  <Smile strokeWidth={2} size={20} color='#0861f2' className='absolute top-1.5 right-2 cursor-pointer'/>
                  </div>
                  <ThumbsUp strokeWidth={2} size={20} color='#0861f2'   className='cursor-pointer'/>
                  <SendHorizontal strokeWidth={2} size={20} color='#0861f2'   className='cursor-pointer' />
              </div>
      </div>
    </div>
  )
}
