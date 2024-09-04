import { db } from '@/app/firebase/firebase';
import { collection, query, where, getDocs, setDoc, serverTimestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useUserStore } from '@/app/lib/userStore';
import { toast } from "sonner";

export const AddUserModal = ({ title }) => {
  const {currentUser} = useUserStore()
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (data) => {
    const { username } = data;
    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log('Error while adding new user', err.message);
    }
  };


  const handleAddFriend  = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
      setOpenModal(false)
      toast.success("Successfully Added!");
    } catch (err) {
      console.log("error while add friend ", err)
    }
  };



  return (
    <div>
      <h1
        onClick={() => setOpenModal(true)}
        className={`rounded-md bg-primary p-2 py-1 text-white cursor-pointer hover:bg-blue-700 border-[.09rem] border-primary duration-500 w-fit mx-auto`}
      >
        {title}
      </h1>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${
          openModal ? 'opacity-1 visible' : 'invisible opacity-0'
        } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute w-full rounded-lg text-secondary bg-primary dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
            openModal
              ? 'opacity-1 translate-y-0 duration-300'
              : '-translate-y-20 opacity-0 duration-150'
          }`}
        >
          <X
            strokeWidth={2}
            size={26}
            onClick={() => setOpenModal(false)}
            className="cursor-pointer absolute top-2 right-2 hover:text-danger duration-500"
          />
          <div className="pt-8 p-4 space-y-3">
            <div>
              <h1 className="pb5 text-xl">Add new friend</h1>
                <p className="text-sm">Be carefull, it might be case-sensitive!</p>
            </div>

            {/* User adding form */}
            <form onChange={handleSubmit(handleSearch)}>
              {/* Username */}
              <div className="flex flex-col gap-1 relative">
                <div className="w-full flex">
                  <input
                    type="text"
                    {...register('username', { required: 'Username is required' })}
                    className="block w-full px-2 py-2 text-black bg-primary border-2 border-gray-300 rounded-md shadow focus:bg-gray-200 focus:border-secondary focus:outline-none focus:ring-0 placeholder:text-gray-300"
                    placeholder="Username"
                  />
                </div>
                {errors.username && (
                  <span className="text-gray-200">{errors.username.message}</span>
                )}
              </div>
            </form>

            {user && (
              <div className="flex items-center justify-between gap-2 ">
                <div className='flex items-center gap-2'>
                  <Image
                  src={user.avatar}
                  alt="user picture"
                  width={35}
                  height={35}
                  quality={100}
                  className="w-12 h-12 rounded-full border border-primary group-hover:opacity-60 duration-500"
                />
                <h1 className='text-lg font-medium'> {user.username} </h1>
                </div>
                <button
                  onClick={handleAddFriend}
                  type="button"
                  className="cursor-pointer bg-gray-300 text-primary font-medium px-4 py-2 rounded-md border-2 hover:bg-secondary border-gray-300 hover:shadow-md duration-500"
                >
                  Add Friend
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};