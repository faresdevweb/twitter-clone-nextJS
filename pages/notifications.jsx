import React,{ useEffect, useState } from 'react'
import { UserState } from '@/context/User context/UserContext'
import { useRouter } from 'next/router';
import NotificationsComponents from '@/components/NotificationsComponents'
import { useTweet } from '@/hooks/useTweet';

const notifications = ( { userNotifications } ) => {

  const { state: { users, currentUser }, dispatchUsers } = UserState();
  const [ notifications, setNotifications ] = useState(null);
  const router = useRouter();
  const { username } = router.query;  

  useEffect(() => {
    setNotifications(userNotifications[0].notifications);
  }, [userNotifications]);
  console.log('User notifications:', userNotifications);
  console.log('Notifications state:', notifications);


  useEffect(() => {
    if(!currentUser){
      router.push('/')
    }
  })

  return (
    <div className='border-2 p-3 xs:h-[80%] xs:relative xs:overflow-auto xs:w-full sm:h-full xl:w-[40%] 2xl:w-[60%]'>
      <div className="flex items-start border-b">
        <h2 className="text-2xl font-bold">Notifications</h2>
      </div>
      <div className="h-screen p-5">
        {
          notifications && notifications.map((notification, index) => (
            <NotificationsComponents
              key={index}
              content={notification.type}
            />
          ))
        }
      </div>
    </div>
  )
}

export default notifications


export async function getServerSideProps (context) {

  const { query } = context
  const { username } = query;

  const response = await fetch(`http://localhost:5000/users?username=${username}`);

  const data = await response.json();

  return {
    props: {
      userNotifications: data,
    }
  }
}