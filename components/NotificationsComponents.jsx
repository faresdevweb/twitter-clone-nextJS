import React from 'react';
import Image from 'next/image';
import logo from "/public/logo.png";
import { TiDelete } from "react-icons/ti";

const NotificationsComponents = ({ content }) => {
    return (
        <div className="flex items-center border-2 rounded-full p-3 mb-5 relative">
            <Image src={logo} width={35} className='mr-2' alt='logo twitter'/>
            <p className='text-lg p-2'> {content} </p>
        </div>
      )
}

export default NotificationsComponents