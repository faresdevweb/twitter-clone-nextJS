import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Recommend = ({ username,profileImage }) => {
    return (
        <div className='border-2 flex justify-around items-center p-5 w-[90%] mx-auto rounded-full mb-5'>
            <Image 
                src={profileImage} 
                width={45} 
                height={45} 
                className='rounded-full' 
                alt='Recommendation profile image'
            />
            <Link href={`/profile/${username}`}>
                <p className='font-bold text-xl'>{username}</p>
            </Link>
            <button className='bg-black text-white rounded-full font-bold px-3 py-1 hover:opacity-50 duration-200'>Follow</button>
        </div>
      )
}

export default Recommend;