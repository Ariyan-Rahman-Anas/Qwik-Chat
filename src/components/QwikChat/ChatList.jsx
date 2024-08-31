import Logo from '@/components/ui/Logo'
import { Settings, SquarePen } from 'lucide-react'

export default function ChatList() {
  return (
      <div className="">
          <div className="flex items-center justify-between pr-4 py-3 ">
          <Settings strokeWidth={2} size={20} color='#0861f2' />
              <Logo textSize="1.2rem" />
              <SquarePen strokeWidth={2} size={20} color='#0861f2' />
          </div>
      Chat List
    </div>
  )
}