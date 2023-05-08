import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from "/public/logo.png"
import { UserState } from '@/context/User context/UserContext'
import { AiFillHome } from "react-icons/ai"
import { IoNotifications } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { BiLogOut } from "react-icons/bi"

const Sidebar = () => {


    const { state: { users, currentUser }, dispatchUsers } = UserState();

    return (
        <aside className='max-w-[850px] md:w-[300px] xl:w-[200px] lg:w-[300px] w-1/4 flex flex-col justify-center items-center h-full xs:flex xs:w-full xs:h-[10%] xs:p-2 sm:w-[100px] sm:h-full sm:justify-start sm:p-4'>
            <div className='sm:place-content-start sm:flex sm:flex-col sm:items-center sm:justify-center xl:w-full'>
                <div className='w-fit cursor-pointer xs:absolute sm:static xs:top-[0px] xs:left-[175px] sm:block'>
                  <Image 
                    src={logo} 
                    alt="Twitter logo" 
                    width={75} 
                    height={75} 
                    className='hover:opacity-50' 
                  />
                </div>
                <div className='xs:flex-grow xs:flex xs:space-x-8 xs:mt-2 sm:mt-10 sm:flex-col sm:space-x-0 xl:w-full xl:items-start '>
                <Link href='/home'>
                  <div className="hover:bg-gray-400 hover:opacity-50 rounded-full p-3 cursor-pointer sm:mb-8 md:flex md:items-center md:gap-2 ">
                      <div className='lg:mr-3'>
                        <AiFillHome/>
                      </div>
                      <div className=''>
                        <p className='xs:hidden md:block xl:block'>Home</p>
                      </div>
                  </div>
                  </Link>
                  <Link href={`/notifications?username=${currentUser && currentUser.username}`}>
                  <div className="hover:bg-gray-400 hover:opacity-50 rounded-full p-3 cursor-pointer sm:mb-8 md:flex md:items-center md:gap-2">
                      <div className='lg:mr-3'>
                        <IoNotifications/>
                      </div>
                      <div className=''>
                        <p className='xs:hidden md:block xl:block'>Notifications</p>
                      </div>
                  </div>
                  </Link>
                  <Link href={`/profile/${currentUser && currentUser.username}`}>
                    <div className="hover:bg-gray-400 hover:opacity-50 rounded-full p-3 cursor-pointer sm:mb-8 md:flex md:items-center md:gap-2">
                      <div className='lg:mr-3'>
                        <CgProfile/>
                      </div>
                      <div className=''>
                        <p className='xs:hidden md:block xl:block'>Profile</p>
                      </div>
                    </div>
                  </Link>
                  <div 
                    className="hover:bg-gray-400 hover:opacity-50 rounded-full p-3 cursor-pointer sm:mb-8 md:flex md:items-center md:gap-2"
                    onClick={() => dispatchUsers({ type: "LOG_OUT" })}
                  >
                    <div className='lg:mr-3'>
                      <BiLogOut/>
                    </div>
                    <div className=''>
                      <p className='xs:hidden md:block xl:block'>Log out</p>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    currentUser && <p>{currentUser.username}</p>
                  }
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;