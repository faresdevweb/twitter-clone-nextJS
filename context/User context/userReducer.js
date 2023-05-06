export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};
