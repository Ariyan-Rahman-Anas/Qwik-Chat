import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={"/"} className='text-3xl font-bold group text-center '>
                    <h1>
                        <span className="mx-3 relative inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:from-primary group-hover:via-primary group-hover:to-primary duration-1000">
                            Qwik chat
                        </span>
                    </h1>
                </Link>
  )
}