import { NavbarRoutes } from './NavbarRoutes';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';


function NavbarComponent(){
	const location = useLocation().pathname;
	const [hidden, setHidden] = useState(true);
	// console.log("hidden", hidden);
	
return(

 <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 md:dark:bg-gray-800" >
  <div className="container flex flex-wrap items-center justify-between mx-auto">
    <a href="https://iamsunil25.github.io/portfolio" className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">iamsunil25</span>
    </a>
    <button  aria-expanded={hidden} 
	
	
	onClick={()=>setHidden(false)}
		   data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default">
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>
<NavbarRoutes hidden={hidden} setHidden={setHidden} pathname={location}  />
  </div>
</nav>

)
}
export default NavbarComponent
