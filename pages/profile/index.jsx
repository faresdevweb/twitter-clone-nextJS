import React,{ useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserState } from '@/context/User context/UserContext';
import Image from 'next/image';

const Profile = () => {

  const router = useRouter();
  
  const { state: { users, currentUser }, dispatch } = UserState();

  useEffect(() => {
    if(!currentUser){
      router.push('/');
    }
  })



  return (
    <div className="p-3 xs:h-[80%] xs:relative xs:overflow-auto xs:w-full sm:h-full xl:w-[40%] 2xl:w-[60%]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="">
              <Image
                src={"/default-avatar.png"}
                width={100}
                height={100}
                className="rounded-full p-1 border mb-[20px]"
              />
            </div>
            <button 
                className='h-fit px-2 py-2 rounded-full border border-gray-500 mr-[15px]'
            >
                Edit profile
            </button>
        </div>
        <div className='borderp-3 mt-[10px]'>
            <h2 className='text-xl font-bold'>Fares</h2>
            <div className="flex gap-2">
                <p className='w-fit hover:underline cursor-pointer'>65 following</p>
                <p className='w-fit hover:underline cursor-pointer'>65 followers</p>
            </div>
        </div>
        <div className="flex justify-around">
            <button>Tweets</button>
            <button>Likes</button>
            <button>Retweet</button>
        </div>
        <div className='border text-center p-5 mt-4 border-blue-500'>
            <h1>ICI IL Y AURA LES TWEET/LIKE/RETWEET DE L'USER</h1>
        </div>
    </div> 
  )
}

export default Profile