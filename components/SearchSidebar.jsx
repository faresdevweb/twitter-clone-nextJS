import React from 'react'

const SearchSidebar = ({ children }) => {
  return (
    <div className='border w-[35%] xs:hidden sm:hidden lg:hidden xl:block'>
        {children}
    </div>
  )
}

export default SearchSidebar