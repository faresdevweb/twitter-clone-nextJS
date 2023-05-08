import React, { useEffect, useState } from 'react'
import { useSearch } from '@/hooks/useSearch';
import Recommend from './Recommend';
import Searchbar from './Searchbar';

const SearchSidebar = () => {

  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { getRandomUsers, searchUsers } = useSearch(query, setQuery,user,setSearchResults,searchResults);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUser(data));
  
    searchUsers(query);
  }, [query]);
   
  return (
    <div className='border w-[35%] xs:hidden sm:hidden lg:hidden xl:block p-3'>
      <Searchbar 
        query={query} 
        setQuery={setQuery} 
      />
       {searchResults.map((user) => (
          <Recommend 
            key={user.id} 
            username={user.username}
            profileImage={user.profileImage} 
          />
      ))}
      <div className="font-bold text-2xl mb-4">
        <h1>Who to follow</h1>
      </div>
      {getRandomUsers()}
    </div>
  );
};

export default SearchSidebar;
