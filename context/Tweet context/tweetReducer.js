export const tweetReducer = (state,action) => {
    switch(action.type){
        case "SET_TWEETS":
            return {
                ...state,
                tweets: action.payload
            }
        case "UPDATE_TWEET": 
            return {
                ...state,
                tweets: state.tweets.map((tweet) => (
                    tweet.id === action.payload.id ? action.payload : tweet
                ))
            }
        case 'ADD_TWEET':
            return {
              ...state,
              tweets: [action.payload, ...state.tweets],
            };
        case "ADD_COMMENT":
            const { tweetId, comment } = action.payload;
            const updatedTweets = state.tweets.map((tweet) => {
              if (tweet.id === tweetId) {
                return { ...tweet, comments: [...tweet.comments, comment] };
              }
              return tweet;
            });
        
            return { ...state, tweets: updatedTweets };
        case 'SET_COMMENT': 
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state
    }
}