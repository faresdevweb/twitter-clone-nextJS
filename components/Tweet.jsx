import React, { useEffect, useState } from 'react'
import { TweetState } from '@/context/Tweet context/TweetContext';
import { UserState } from '@/context/User context/UserContext';
import Image from 'next/image'
import { useRouter } from 'next/router';

const Tweet = (props) => {

    const { id,tweetId, tweetContent , userId , comments , likes , retweet , username , currentUser, onClickLike, onClickRetweet } = props;
  
    const { dispatchTweet } = TweetState();

    const router = useRouter();
    
    const handleCommentClick = (id) => {
        router.push(`/comments/${id}`)
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
                    <p> {username} </p>
                </div>
            </div>
            <div className='p-3 flex justify-end'>
                <p className='w-[90%]'> {tweetContent} </p>
            </div>
            <div className='flex justify-around items-center'>
                <button onClick={onClickLike}> {likes.length} Like</button>
                <button onClick={onClickRetweet}> {retweet.length} Retweet</button>
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


