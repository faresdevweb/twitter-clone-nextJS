import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineSearch } from "react-icons/ai"

const Searchbar = ({ query, setQuery, onKeyDown }) => {


    return (
        <div className='flex p-5'>
    
            <div className='relative w-full'>
                <input
                    placeholder='Search Twitter' 
                    type="search" 
                    className='p-3 w-full mx-auto border border-gray-500 rounded-full'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <AiOutlineSearch className='w-[25px]  right-[14px] top-[18px] absolute'/>
            </div>
            
        </div>
      )
}

export default Searchbar