import { useUserStore } from '@/app/lib/userStore';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/app/firebase/firebase';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export const ProfileModal = ({ title }) => {

    const router = useRouter();
    const { currentUser } = useUserStore()
    const [openModal, setOpenModal] = useState(false);

    //handling log out
    const handleLogout = async () => {
        try {
            await auth.signOut()
            toast.success("Account Logged out!")
            router.push("/sign-in")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="">
            <h1 onClick={() => setOpenModal(true)}
                className='text-md font-semibold text-primary group-hover:text-blue-800 duration-500 cursor-pointer'
            >
                {title}
            </h1>
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                <div 
                    onClick={(e_) => e_.stopPropagation()}
                        className={`absolute w[26rem] h[30rem] rounded-xl bg-primary p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>

                    <div className="flex items-center justify-between gap-16 text-secondary " >
                        <div className=" rounded-md flex flex-col items-center justify-center space-y4">
                            <Image
                                src={currentUser?.avatar}
                                alt='user picture'
                                width={40}
                                height={40}
                                quality={100} className='w-28 h-28 rounded-full border-primary mx-auto shadow shadow-darkGray mb-2 ' />
                            <h1 className="font-semibold text-xl tracking-wide " >{currentUser?.username}</h1>
                            <p className="text-sm font-semibold tracking-wide" >Web Engineer</p>

                            <div className="mt-4 flex items-start gap-10 "> 
                                <div className="font-semibold text-left space-y-1 ">
                                    <p>Age</p>
                                    <p>Education</p>
                                    <p>Location</p>
                                </div>
                                <div className="text-gray-200 text-left space-y-1 ">
                                    <p>0</p>
                                    <p>Abcd</p>
                                    <p>Abcde</p>
                                </div>
                            </div>
                            
                            <div className='flex items-center gap-4 mt-4 w-full '>
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer text-danger font-medium px-4 py-2 rounded-md border-[.1rem] border-danger hover:text-secondary hover:bg-danger duration-500 ">
                                    Log out
                                </button>
                                <Link href={"/"} onClick={() => setOpenModal(false)} className="btn-2">
                                    Back to Home
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary ">
                            <div className="bg-secondary h-[10rem] w-[10rem] rounded-2xl p-2 ">
                                <h1 className="font-semibold text-left pl-1 text-lg ">Bio</h1>
                            </div>
                            <div className="bg-secondary h-[10rem] w-[10rem] rounded-2xl p-2 ">
                                <h1 className="font-semibold text-left pl-1 text-lg ">Goals</h1>
                            </div>
                            <div className="bg-secondary h-[10rem] w-[10rem] rounded-2xl p-2 ">
                                <h1 className="font-semibold text-left pl-1 text-lg ">Motivations</h1>
                                </div>
                            <div className="bg-secondary h-[10rem] w-[10rem] rounded-2xl p-2 ">
                                <h1 className="font-semibold text-left pl-1 text-lg ">Concerns</h1></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}