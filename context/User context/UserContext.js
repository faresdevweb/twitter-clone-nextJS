import { createContext, useState, useReducer, useContext, useEffect } from "react";
import { userReducer } from "./userReducer";

const initialState = {
  users: [],
  currentUser: null,
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatchUsers ] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/users");
      const storedUsers = await response.json();
      if (storedUsers && storedUsers.length > 0) {
        dispatchUsers({ type: "SET_USERS", payload: storedUsers });
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserState doit être utilisé à l'intérieur d'un UserProvider");
  }

  return context;
};
