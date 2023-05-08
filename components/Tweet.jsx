import React, { useEffect, useState } from 'react'
import { TweetState } from '@/context/Tweet context/TweetContext';
import { AiOutlineLike,AiOutlineRetweet } from "react-icons/ai"
import { UserState } from '@/context/User context/UserContext';
import Image from 'next/image'
import { useRouter } from 'next/router';

const Tweet = (props) => {

    const { id,
        tweetId,
        tweetContent ,
        userId ,
        comments ,
        likes ,
        retweet , 
        username ,
        currentUser,
        onClickLike,
        onClickRetweet} = props;
  
    const { dispatchTweet } = TweetState();

    const router = useRouter();
    
    const handleCommentClick = (id) => {
        router.push(`/comments/${id}`)
    }

    const handleUsernameClick = (username) => {
        router.push(`/profile/${username}`)
    }


    return (
        <div className='border border-black rounded-lg w-[80%] mx-auto mb-5 sm:w-[100%]'>
            <div className="container-name  flex justify-start p-3">
                <div className='flex w-[90%]'>
                    <Image
                        src={"/default-avatar.png"}
                        width={45}
                        height={45}
                        className="rounded-full mr-2"
                        alt='Image tweet'
                    />
                    <p 
                        className='hover:underline hover:cursor-pointer'
                        onClick={() => handleUsernameClick(username)}
                    > {username} </p>
                </div>
            </div>
            <div className='p-3 flex justify-end'>
                <p className='w-[90%]'> {tweetContent} </p>
            </div>
            <div className='flex justify-around items-center'>
                <button 
                    onClick={onClickLike} 
                    className='flex items-center gap-2'
                > {likes.length} <AiOutlineLike 
                />
                
                </button>
                <button onClick={onClickRetweet} className='flex items-center gap-2'> {retweet.length} <AiOutlineRetweet/></button>
                {
                  router.pathname === "/comments/[commentId]" ? <></> : <button onClick={() => handleCommentClick(id)}> {comments.length} Commentaire</button>
                }
            </div>
        </div>
      )
}

export default Tweet

// {retweet.length} 
// {likes.length}


