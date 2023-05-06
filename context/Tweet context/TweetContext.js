import { createContext, useContext, useEffect, useReducer } from "react";
import { tweetReducer } from "./tweetReducer";

const initialState = {
    tweets: [],
  };
  

const TweetContext = createContext();

export const TweetProvider = ({children}) => {

    const [ state, dispatchTweet ] = useReducer(tweetReducer, initialState);

    useEffect(() => {
      const fetchTweets = async () => {
        const response = await fetch("http://localhost:5000/tweets");
        const storedTweets = await response.json();
        if (storedTweets && storedTweets.length > 0) {
          dispatchTweet({ type: "SET_TWEETS", payload: storedTweets });
        }
      };
  
      fetchTweets();
    }, []);

    return (
        <TweetContext.Provider value={{ state , dispatchTweet }}>
            {children}
        </TweetContext.Provider>
    )
}

export const TweetState = () => {
    const context = useContext(TweetContext);

    if(!context){
        throw new Error("TweetState doit être utilisé à l'intérieur d'un TweetProvider");
    }

    return context
}


// [
//   {
//     id: "",
//     userId: "",
//     userName: "",
//     content: "",
//     likes: [
//       { userId: "", userName: "" },
//       { userId: "", userName: "" },
//     ],
//     retweets: [
//       { userId: "", userName: "" },
//       { userId: "", userName: "" },
//     ],
//     comments: [
//       {
//         id: "",
//         userId: "",
//         userName: "",
//         content: "",
//         likes: [
//           { userId: "", userName: "" },
//           { userId: "", userName: "" },
//         ],
//         retweets: [
//           { userId: "", userName: "" },
//           { userId: "", userName: "" },
//         ],
//       },
//     ],
//   },
// ]