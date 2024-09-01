import { db } from '@/app/firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

export const AddUserModal = ({ title }) => {
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
        setUser(null); // Clear user if not found
      }
    } catch (err) {
      console.log('Error while adding new user', err.message);
    }
  };

  return (
    <div>
      <h1
        onClick={() => setOpenModal(true)}
        className="rounded-md text-2xl bg-primary p-2 py-1 text-white cursor-pointer hover:bg-blue-700 border-[.09rem] border-primary duration-500"
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
            <h1 className="pb-5 text-xl">Add new user</h1>

            {/* User adding form */}
            <form onSubmit={handleSubmit(handleSearch)}>
              {/* Username */}
              <div className="flex flex-col gap-1 relative">
                <div className="w-full flex">
                  <input
                    type="text"
                    {...register('username', { required: 'Username is required' })}
                    className="block w-full px-2 py-2 text-gray-200 bg-primary border-2 border-r-0 border-gray-300 rounded-l-md shadow focus:bg-gray-200 focus:border-secondary focus:outline-none focus:ring-0 placeholder:text-gray-300"
                    placeholder="Username"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer bg-gray-300 text-primary font-medium px-4 py-2 rounded-r-md border-2 border-l-0 hover:bg-secondary border-gray-300 hover:shadow-md duration-500"
                  >
                    Search
                  </button>
                </div>
                {errors.username && (
                  <span className="text-red-600">{errors.username.message}</span>
                )}
              </div>
            </form>

            {user && (
              <div className="flex gap-2 relative">
                <Image
                  src={user.avatar}
                  alt="user picture"
                  width={35}
                  height={35}
                  quality={100}
                  className="w-12 h-12 rounded-full border border-primary group-hover:opacity-60 duration-500"
                />
                <button
                  type="button"
                  className="cursor-pointer bg-gray-300 text-primary font-medium px-4 py-2 rounded-md border-2 hover:bg-secondary border-gray-300 hover:shadow-md duration-500"
                >
                  {user.username}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};