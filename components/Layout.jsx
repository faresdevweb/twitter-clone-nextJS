import React from 'react'
import Sidebar from './NavigationSidebar';
import Recommend from './Recommend';
import SearchSidebar from './SearchSidebar';
import Searchbar from './Searchbar';
import { UserState } from '@/context/User context/UserContext';


const Layout = ( {children, isLoginPage } ) => {

  const { state: { users, currentUser }, dispatchUsers } = UserState();

  return (
    <div className='flex sm:justify-center xs:flex-col-reverse sm:flex-row h-screen max-w-[1400px] mx-auto'>
        { !isLoginPage && currentUser && <Sidebar/> }
        {children}
        { !isLoginPage && currentUser && <SearchSidebar/> }
    </div>

  )
}

export default Layout;