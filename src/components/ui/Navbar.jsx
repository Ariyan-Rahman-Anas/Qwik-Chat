"use client"

import { AlignJustify, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { useState } from 'react';
import Logo from './Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useUserStore } from '@/app/lib/userStore';
import Image from 'next/image';

export default function Navbar() {
    const navItems = [
        { name: 'Home', href: '/' },
        // { name: 'Add Book', href: '/add-book' },
    ];

    const pathname = usePathname(); 
    const [menu, setMenu] = useState()


    //for small devices, when user clicked on an nav items the whole nav menu will hide automatically
    const hidingMenu = () => {
        setMenu(!menu);
    };


  const {currentUser}  = useUserStore()

    return (
        <nav className="flex items-center justify-between py-4">
            <div className="left flex items-center justify-between w-full md:w-fit ">
                <Logo textSize="1.8rem" />   
                {menu ? <X onClick={() => setMenu(!menu)} color='gray' size={24} className='md:hidden' /> : <AlignJustify onClick={() => setMenu(!menu)} color='gray' size={24} className='md:hidden' />}
            </div>
            <div className="middle ">
                <ul
                    className={`flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-4 absolute md:static ${menu
                            ? "left-0 top-[3.8rem] py-10 md:py-0 right-0 bg-black md:bg-transparent rounded-md w-full min-h-screen md:min-h-0 "
                            : "-left-[69rem]"
                        }  duration-700 z-[100] `}
                >
                    {navItems.map((item, index) => (
                        <li onClick={hidingMenu} key={index} className="relative group">
                            <Link href={item.href}
                                    className={`${pathname === item.href
                                            ? 'border-b-2 border-gray rounded-sm text-primary'
                                            : 'border-b-2 border-b-transparent'
                                        } duration-500  `}
                                >
                                    {item.name}
                            </Link>
                            <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-gray transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300"></span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right hidden md:flex items-center gap-5">
                 <ThemeToggle />
                {
                    currentUser ? <Image
                        src={currentUser?.avatar}
                        alt='user picture'
                        width={50}
      height={50}
	  quality={100} className='w-12 h-12 rounded-full' />  : <Link href="/qwik-chat" className='btn-2'>
                    {`Messages`}
                </Link>
                }
            </div>
        </nav>
    );
}
