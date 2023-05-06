import React, { useEffect, useState } from 'react'
import { UserState } from '@/context/User context/UserContext'
import { TweetState } from '@/context/Tweet context/TweetContext';
import { useRouter } from 'next/router';
import TweetForm from '@/components/TweetForm';
import Tweet from '@/components/Tweet';

const Home = ( { tweetsData } ) => {

    const router = useRouter();

    const { state: { currentUser }, dispatchUsers } = UserState();

    const [ tweetContent, setTweetContent ] = useState('');

    const { state: { tweets }, dispatchTweet } = TweetState();

    const SubmitTweet = async () => {
        if(tweetContent.trim() !== ""){
          const newTweet = {
            tweetId: `id-${Date.now()}-${Math.floor(Math.random() * 1e9)}`,
            tweetContent: tweetContent,
            userId: currentUser.id,
            username: currentUser.username,
            likes: [],
            retweet: [],
            comments: []
          };
          const response = await fetch("http://localhost:5000/tweets", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newTweet),
            });
              const createdTweet = await response.json();
              dispatchTweet({ type: "ADD_TWEET", payload: createdTweet })
              setTweetContent('');
        }
      }
      
    const handleLike = async (id) => {
        const tweetToLike = tweets.find((tweet) => tweet.id === id)
        const existingLike = tweetToLike.likes.find(like => like.likeFrom === currentUser.id);
      
        let newLikes;
        if (existingLike) {
          newLikes = tweetToLike.likes.filter(like => like.likeFrom !== currentUser.id);
        } else {
          newLikes = [
            ...tweetToLike.likes,
            {
              username: currentUser.username,
              likeFrom: currentUser.id,
            },
          ];
        }
      
        const response = await fetch(`http://localhost:5000/tweets/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tweetId: tweetToLike.tweetId,
            tweetContent: tweetToLike.tweetContent,
            userId: tweetToLike.userId,
            username: tweetToLike.username,
            comments: tweetToLike.comments,
            likes: newLikes,
            retweet: tweetToLike.retweet ? [...tweetToLike.retweet] : [],
          }),
        });
        const updatedTweet = await response.json();
        dispatchTweet({ type: "UPDATE_TWEET", payload: updatedTweet })
    };

    const handleRetweet = async (id) => {
        const tweetToRetweet = tweets.find((tweet) => tweet.id === id)
        const existingRetweet = tweetToRetweet.retweet.find(r => r.retweetFrom === currentUser.id)
      
        let newRetweet;
        if(existingRetweet){
            newRetweet = tweetToRetweet.retweet.filter(retweet => retweet.retweetFrom !== currentUser.id)
        } else {
            newRetweet = [
              ...tweetToRetweet.retweet,
              {
                username: currentUser.username,
                retweetFrom: currentUser.id
              }]
        }
      
        const response = await fetch(`http://localhost:5000/tweets/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tweetId: tweetToRetweet.tweetId,
              tweetContent: tweetToRetweet.tweetContent,
              userId: tweetToRetweet.userId,
              username: tweetToRetweet.username,
              comments: tweetToRetweet.comments,
              likes: tweetToRetweet.likes ? [...tweetToRetweet.likes] : [],
              retweet: newRetweet,
            }),
        });
        const updatedTweet = await response.json();
        dispatchTweet({ type: "UPDATE_TWEET", payload: updatedTweet })
    };
      

    useEffect(() => {
        if(tweetsData) {
            dispatchTweet({ type: "SET_TWEETS", payload: tweetsData.tweets })
        }
    },[tweetsData])

    useEffect(() => {
        if(!currentUser){
            router.push('/');
        }
    })

  return (
    <div className='border-2 p-3 xs:h-[80%] xs:relative xs:overflow-auto xs:w-full sm:h-full xl:w-[40%] 2xl:w-[60%]'>
        <TweetForm 
            currentUser={currentUser} 
            dispatch={dispatchUsers} 
            onClick={SubmitTweet} 
            tweetContent={tweetContent} 
            setTweetContent={setTweetContent}
        />
    <div>
        {
            tweets && tweets.map((tweet) => (
                <Tweet
                    key={tweet.id}
                    userId={tweet.userId} 
                    currentUser={currentUser}
                    id={tweet.id}
                    tweetId={tweet.tweetId}
                    tweetContent={tweet.tweetContent}
                    username={tweet.username}
                    comments={tweet.comments}
                    likes={tweet.likes}
                    retweet={tweet.retweet}
                    onClickLike={() => handleLike(tweet.id)}
                    onClickRetweet={() => handleRetweet(tweet.id)}
                />
            ))
        }
    </div>
    </div>
  )
}

export default Home


export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/api/getTweets');
    const data = await response.json();

    console.log("data in getserversideprops :" , data);

    return {
        props: {
            tweetsData: data,
        }
    }
}
    
