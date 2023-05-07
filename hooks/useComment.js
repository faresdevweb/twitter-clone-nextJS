import { TweetState } from "@/context/Tweet context/TweetContext";
import React, { useState } from "react";

export const useComment = (currentUser,comments,setComments,tweet) => {

    const { state: { tweets }, dispatchTweet } = TweetState();

    const [ tweetContent, setTweetContent ] = useState('');

    const handlePostComments = async () => {
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
      
      const handleLikeComment = async (id) => {
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
        }

   const handleRetweetComment = async (id) => {
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

    return { tweetContent, setTweetContent, handlePostComments, handleLikeComment, handleRetweetComment }
}       