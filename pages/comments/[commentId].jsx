import React,{ useState, useEffect } from 'react'
import { useComment } from '@/hooks/useComment';
import Tweet from '@/components/Tweet';
import TweetForm from '@/components/TweetForm';
import { UserState } from '@/context/User context/UserContext';
import { TweetState } from '@/context/Tweet context/TweetContext';
import { useRouter } from 'next/router';

const Comment = ({ tweet }) => {

  const router = useRouter();
  const { tweetId } = router.query;
  const [comments, setComments] = useState(tweet.comments);
  const { state: { currentUser } } = UserState();
  const { state: { tweets }, dispatchTweet } = TweetState();

  const { tweetContent, setTweetContent, handlePostComments,handleLikeComment, handleRetweetComment } = useComment(currentUser,comments,setComments,tweet);

  useEffect(() => {
    if(!currentUser){
      router.push('/');
    }
  })
  return (
    <div className='border-2 p-3 xs:h-[80%] xs:relative xs:overflow-auto xs:w-full sm:h-full xl:w-[40%] 2xl:w-[60%]'> 
       <Tweet
          userId={tweet.userId} 
          currentUser={currentUser}
          id={tweet.id}
          tweetId={tweet.tweetId}
          tweetContent={tweet.tweetContent}
          username={tweet.username}
          comments={tweet.comments.commentContent}
          likes={tweet.likes}
          retweet={tweet.retweet}
        />
        <div className="mt-5">
          <TweetForm
            tweetContent={tweetContent}
            setTweetContent={setTweetContent}
            onClick={handlePostComments}
            currentUser={currentUser}
          />
        </div>
        <div className="mt-3">
          {
            comments && comments.map((comment,index) => (
              <Tweet
                  key={index}
                  userId={comment.userId} 
                  currentUser={currentUser}
                  id={comment.id}
                  tweetId={comment.tweetId}
                  tweetContent={comment.commentContent}
                  username={comment.username}
                  comments={comment.comments}
                  likes={comment.likes}
                  retweet={comment.retweet}
                  onClickLike={() => handleLikeComment(comment.id)}
                  onClickRetweet={() => handleRetweetComment(comment.id)}
              />
            ))
          }
        </div>
    </div>
  )
}

export default Comment;



export async function getServerSideProps(context){

  const { commentId } = context.params;

  const response = await fetch(`http://localhost:5000/tweets/${commentId}`);

  const data = await response.json();

  return {
    props:{
      tweet: data,
    }
  }
}