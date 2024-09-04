import { useUserStore } from '@/app/lib/userStore';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/app/firebase/firebase';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export const UserModal = ({ title }) => {

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
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-[26rem] h[30rem] rounded-lg bg-primary p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
                    <div className="bg-secondary mt-10 p-5 rounded-md flex flex-col items-center justify-center space-y4">

                        <Image
                            src={currentUser?.avatar}
                            alt='user picture'
                            width={40}
                            height={40}
                            quality={100} className='absolute top-5 left-0 right-0 w-20 h-20 rounded-full border2 border-primary mx-auto shadow shadow-darkGray ' />
                        <h1 className="text-primary font-medium mt-7 " >{currentUser?.username}</h1>
                        <h1 className="text-sm" >{currentUser?.email}</h1>
                        <div className='flex items-center justify-around mt-4 w-full '>
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
                </div>
            </div>
        </div>
    );
}