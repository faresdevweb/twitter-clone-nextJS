import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useTweet } from '@/hooks/useTweet';
import { UserState } from '@/context/User context/UserContext';
import { TweetState } from '@/context/Tweet context/TweetContext';
import { useRouter } from 'next/router';
import TweetForm from '@/components/TweetForm';
import Tweet from '@/components/Tweet';

const Home = ( { tweetsData } ) => {

    const router = useRouter();
    const { state: { currentUser }, dispatchUsers } = UserState();
    const [ isLoading, setIsLoading ] = useState(true);
    const { state: { tweets }, dispatchTweet } = TweetState();
    const { tweetContent, setTweetContent, handlePostTweet, handleLike, handleRetweet }  = useTweet(currentUser);

    useEffect(() => {
        if(tweetsData) {
            dispatchTweet({ type: "SET_TWEETS", payload: tweetsData.tweets })
        }
    },[tweetsData])

    useEffect(() => {
        if (!currentUser) {
          router.push("/?mustBeConnectModal=true");
        } else {
          setIsLoading(false);
        }
      }, [currentUser]);

  return (
    isLoading ? (
        <div className="mt-10">
            <MoonLoader color="#36d7b7" />
        </div>
    ) : <div className='border-2 p-3 xs:h-[80%] xs:relative xs:overflow-auto xs:w-full sm:h-full xl:w-[40%] 2xl:w-[60%]'>
    <div className='md:max-w-[700px] md:mx-auto sm:max-w-[450px] sm:mx-auto'>
    <TweetForm
        onClick={handlePostTweet}
        setTweetContent={setTweetContent}
        tweetContent={tweetContent} 
        currentUser={currentUser} 
        dispatch={dispatchUsers} 
    />
    </div>
<div className='md:max-w-[700px] md:mx-auto sm:max-w-[450px] sm:mx-auto'>
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

    return {
        props: {
            tweetsData: data,
        }
    }
}