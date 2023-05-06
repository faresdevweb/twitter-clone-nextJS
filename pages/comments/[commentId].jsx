import React,{ useState, useEffect } from 'react'
import Tweet from '@/components/Tweet';
import TweetForm from '@/components/TweetForm';
import { UserState } from '@/context/User context/UserContext';
import { TweetState } from '@/context/Tweet context/TweetContext';
import { useRouter } from 'next/router';

const Comment = ({ tweet }) => {

  const router = useRouter();
  const { tweetId } = router.query;

  const [comments, setComments] = useState(tweet.comments);
  const [ tweetContent, setTweetContent ] = useState('');

  const { state: { currentUser } } = UserState();
  const { state: { tweets }, dispatchTweet } = TweetState();


  const submitComments = async () => {
    if(tweetContent.trim() !== "") {
      const newComment = {
        id: Date.now(),
        commentContent: tweetContent,
        userId: currentUser.id,
        username: currentUser.username,
        likes: [],
        retweet: [],
      }

      const response = await fetch(`http://localhost:5000/tweets/${tweet.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tweet,
          comments: [...tweet.comments,  newComment],
        }),
      });
      const createdComment = await response.json();
      dispatchTweet({ type: "ADD_COMMENT", payload: { tweetId: tweet.id, comment: newComment }  })
      setComments([...comments, newComment]);
      setTweetContent('');
    }
  }

  const handleLike = async (id) => {
    const tweetToLike = comments.find((comment) => comment.id === id);
  
    if (tweetToLike) {
      const existingLike = tweetToLike.likes.find(
        (like) => like.likeFrom === currentUser.id
      );
  
      let newLikes;
      if (existingLike) {
        newLikes = tweetToLike.likes.filter(
          (like) => like.likeFrom !== currentUser.id
        );
      } else {
        newLikes = [
          ...tweetToLike.likes,
          {
            username: currentUser.username,
            likeFrom: currentUser.id,
          },
        ];
      }
  
      const response = await fetch(`http://localhost:5000/tweets/${tweet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tweet,
          comments: comments.map((comment) =>
            comment.id === id ? { ...comment, likes: newLikes } : comment
          ),
        }),
      });
  
      const updatedTweet = await response.json();
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, likes: newLikes } : comment
        )
      );
    } else {
      console.error("Comment not found!");
    }
  };

  const handleRetweet = async (id) => {
    const tweetToRetweet = comments.find((comment) => comment.id === id);
  
    if (tweetToRetweet) {
      const existingLike = tweetToRetweet.retweet.find(
        (like) => like.likeFrom === currentUser.id
      );
  
      let newRetweet;
      if (existingLike) {
        newRetweet = tweetToRetweet.retweet.filter(
          (like) => like.likeFrom !== currentUser.id
        );
      } else {
        newRetweet = [
          ...tweetToRetweet.retweet,
          {
            username: currentUser.username,
            likeFrom: currentUser.id,
          },
        ];
      }
  
      const response = await fetch(`http://localhost:5000/tweets/${tweet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tweet,
          comments: comments.map((comment) =>
            comment.id === id ? { ...comment, retweet: newRetweet } : comment
          ),
        }),
      });
  
      const updatedTweet = await response.json();
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, retweet: newRetweet } : comment
        )
      );
    } else {
      console.error("Comment not found!");
    }
  };

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
            currentUser={currentUser}
            onClick={submitComments}
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
                  onClickLike={() => handleLike(comment.id)}
                  onClickRetweet={() => handleRetweet(comment.id)}
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