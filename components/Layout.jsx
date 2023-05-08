import React from 'react'
import Sidebar from './NavigationSidebar';
import Recommend from './Recommend';
import SearchSidebar from './SearchSidebar';
import Searchbar from './Searchbar';


const Layout = ( {children, isLoginPage } ) => {
  return (
    <div className='flex sm:justify-center xs:flex-col-reverse sm:flex-row h-screen max-w-[1400px] mx-auto'>
        { !isLoginPage && <Sidebar/> }
        {children}
        { !isLoginPage && <SearchSidebar/> }
    </div>

  )
}

export default Layout;