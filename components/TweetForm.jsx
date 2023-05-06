import React,{ useState } from 'react'
import { TweetState } from '@/context/Tweet context/TweetContext';
import Image from 'next/image';

const TweetForm = ({ tweetContent, setTweetContent , currentUser, onClick}) => {

  const { state: { tweets }, dispatchTweet } = TweetState();

    return (
        <div className="flex flex-col p-3items-center sm:flex-wrap sm:justify-center">
          <div className='w-max-[250px] p-2'>
            <div className="flex justify-between w-full sm:w-auto mb-4 sm:mb-0">
              <div className='h-fit px-2'>
                  <Image
                    src={"/default-avatar.png"}
                    width={45}
                    height={45}
                    className="rounded-full"
                    alt='Profile user'
                  />
              </div>
              <textarea
                value={tweetContent}
                onChange={e => setTweetContent(e.target.value)} 
                placeholder='Whats happening ?'
                name=""
                id=""
                cols="30"
                rows="10"
                className="p-2 w-full h-24 sm:h-32 resize-none border rounded-lg "
              ></textarea>
            </div>
            <div className="flex justify-end w-full">
              <button className="mt-1 px-8 py-1 text-white bg-cyan-500 rounded-full hover:opacity-50 duration-300" onClick={onClick}>Tweet</button>
            </div>
          </div>
        </div>
      );
}

export default TweetForm