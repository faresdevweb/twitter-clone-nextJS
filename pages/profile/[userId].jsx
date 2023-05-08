import React,{ useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import { UserState } from '@/context/User context/UserContext';
import Image from 'next/image';
import Tweet from '@/components/Tweet';
import { useTweet } from '@/hooks/useTweet';
import { TweetState } from '@/context/Tweet context/TweetContext';
import { useFollow } from '@/hooks/useFollow';

const Profile = ( { tweetsUser, dataUser } ) => {

  const [ userTweet, setUserTweet ] = useState(tweetsUser);
  const [ userData, setUserData ] = useState(dataUser);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { userId } = router.query;
  const { state: { users, currentUser }, dispatchUsers } = UserState();
  console.log(currentUser);
  const { state: { tweets }, dispatchTweet } = TweetState();
  const { handleLike, handleRetweet } = useTweet(currentUser);
  const { handleFollow } = useFollow(userData,currentUser,setUserData,users,dispatchUsers);

  useEffect(() => {
      fetch(`http://localhost:5000/tweets?username=${userId}`)
        .then(data => data.json())
        .then(data => setUserTweet(data))
        .catch(err => console.log('ERREUR MESSAGE IN PROFILE : ', err))
        
        fetch(`http://localhost:5000/users?username=${userId}`)
          .then(data => data.json())
          .then(data => setUserData(data))
          .catch(err => console.log('ERREUR MESSAGES IN PROFILE :', err))
  }, [userId]);

  useEffect(() => {
    if (userTweet) {
      dispatchTweet({ type: "SET_TWEETS", payload: userTweet });
    }
  }, [userTweet]);

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
      ) : (
        <div className="p-3 xs:h-[80%] xs:relative xs:overflow-auto xs:w-full sm:h-full xl:w-[40%] 2xl:w-[60%]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="">
              <Image
                src={"/default-avatar.png"}
                width={100}
                height={100}
                className="rounded-full p-1 border mb-[20px]"
              />
            </div>
        </div>
        <div className='borderp-3 mt-[10px]'>
            <div className="flex items-center gap-8 mb-3">
            <h2 className='text-xl font-bold'> { dataUser[0] && dataUser[0].username } </h2>
            {
               dataUser && currentUser && dataUser[0].username === currentUser.username ? (
                 <></>
               ) : <button
                      className="rounded-lg py-2 px-2 bg-black text-white hover:bg-white hover:text-black transition-[0.2s] duration-200"
                      onClick={handleFollow}
                   >
                    Follow
                    </button>
            }             
            </div>
            <div className="flex gap-2">
                <p className='w-fit hover:underline cursor-pointer'> {dataUser[0] && dataUser[0].followers.length} followers </p>
                <p className='w-fit hover:underline cursor-pointer'> {dataUser[0] && dataUser[0].followed.length} followed </p>
            </div>
        </div>
        <div className='p-5 mt-4'>
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
  )
}

export default Profile

export async function getServerSideProps(context) {
  const { userId } = context.params;

  const response = await fetch(`http://localhost:5000/tweets?username=${userId}`)

  const data = await response.json();

  const userInfo = await fetch(`http://localhost:5000/users?username=${userId}`)

  const dataUser = await userInfo.json();

  console.log(dataUser);

  

  return {
    props:{
      tweetsUser: data,
      dataUser: dataUser,
    }
  }
}