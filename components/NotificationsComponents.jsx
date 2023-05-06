import React from 'react'
import Image from 'next/image'
import logo from "/public/logo.png"

const NotificationsComponents = () => {
    return (
        <div>
            <div className="flex items-start border-b">
                <h2 className="text-2xl font-bold">Notifications</h2>
            </div>
            <div className="h-screen p-5 ">
                <div className="flex items-center border rounded-full p-3">
                    <Image src={logo} width={35} className='mr-2'/>
                    <p className='text-lg'>Someone has liked your tweet!</p>
                </div>
            </div>
        </div>
      )
}

export default NotificationsComponents