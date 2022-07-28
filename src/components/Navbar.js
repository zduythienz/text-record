import React from 'react'

const Navbar = () => {
  return (
    <nav className="border-gray-200 nav-header">
      <div className="container pb-4 flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
            <img src="https://img.10fastfingers.com/img/layout/logo@2x.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-sm font-semibold whitespace-nowrap text-white">帮您提升打字速度</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
            <li>
              <a href="#" className=" py-2 pr-4 pl-3  text-white">论坛</a>
              <a href="#" className=" py-2 pr-4 pl-3  text-white">FAQ</a>
              <a href="#" className=" py-2 pr-4 pl-3  text-white">Supporter</a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
    // <div className='w-full py-2.5 h-[46px]'>
    //   <div className=' flex justify-between'>
    //     <div>Logo</div>
    //     <div>FAQ</div>
    //   </div>

    // </div>
  )
}

export default Navbar