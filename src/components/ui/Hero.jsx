import { useUserStore } from '@/app/lib/userStore';
import Link from 'next/link';

export default function Hero() {

  const {currentUser}  = useUserStore()

    return (
      <div className="flex items-center justify-center text-center min-h-[90vh]">
        <div className="group">
          <h1 className="text-4xl md:text-7xl flex flex-col md:flex-row items-center md:items-end justify-center  ">
            <span className="text-2xl md:text-4xl">Explore the</span>
            <span className="mx-3 relative inline-block bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:from-primary group-hover:via-primary group-hover:to-primary duration-1000">
              Qwik Chat
            </span>
            <span className="text-2xl md:text-4xl">Web App</span>
          </h1>
          <p className="text-sm w-full md:w-2/3 mx-auto mt-2 tracking-wider leading-6 mb-3 ">
            Connect instantly with Qwik Chat web! Whether chatting with friends or working with teams, enjoy fast, secure, and easy communication. Dive in and start your conversation today!
          </p>
          {
            currentUser ? <Link href="/qwik-chat" className="btn-2">
            {` What’s on your mind?`}
          </Link> : <Link href="/sign-in" className="btn-2">
            {`Let's Get Started`}
          </Link>
          }
        </div>
      </div>
    );
}