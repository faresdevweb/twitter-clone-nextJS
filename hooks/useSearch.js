import { useState } from "react";
import Recommend from "@/components/Recommend";

export const useSearch = (query,setQuery,user,setSearchResults,searchResults) => {

   const getRandomUsers = () => {
    if (user) {
      const randomUsers = [...user].sort(() => Math.random() - 0.5).slice(0, 5);
      return randomUsers.map((user, index) => (
        <Recommend
          key={index}
          profileImage={user.profileImage}
          username={user.username}
        />
      ));
    }
    return null;
  };

   const searchUsers = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
  
    const results = user.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return { searchUsers,getRandomUsers }
}