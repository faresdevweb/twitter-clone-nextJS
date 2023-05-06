import React,{ useEffect, useState } from 'react'
import { UserState } from '@/context/User context/UserContext'
import { useRouter } from 'next/router';
import NotificationsComponents from '@/components/NotificationsComponents'

const notifications = () => {

  const router = useRouter();
  
  const { state: { users,currentUser, dispatch } } = UserState();

  useEffect(() => {
    if(!currentUser){
      router.push('/')
    }
  })

  return (
    <div className='border-2 p-3 xs:h-[80%] xs:relative xs:overflow-auto xs:w-full sm:h-full xl:w-[40%] 2xl:w-[60%]'>
        <NotificationsComponents/>
    </div>
  )
}

export default notifications