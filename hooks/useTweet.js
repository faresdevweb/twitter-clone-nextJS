import { TweetState } from "@/context/Tweet context/TweetContext";
import { useState } from "react";

export const useTweet = (currentUser) => {

  const { state: { tweets }, dispatchTweet } = TweetState();

  const [ tweetContent, setTweetContent ] = useState('');

  const handlePostTweet = async () => {
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

  return { tweetContent, setTweetContent, handlePostTweet, handleLike, handleRetweet }

}