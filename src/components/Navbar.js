import React from 'react'
import {ChevronDownIcon } from '@heroicons/react/outline'

const Navbar = () => {
  return (
    <nav className="border-gray-200 nav-header">
      <div className="container  flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" >
          <div className="flex items-center"> 
            <img src="https://img.10fastfingers.com/img/layout/logo@2x.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-sm font-semibold whitespace-nowrap text-white" style={{ alignSelf: 'flex-end'}}>帮您提升打字速度</span>
          </div>
          <ul className="nav navbar-nav second-row pt-4 pb-1 text-[#eee] text-sm" >
		      		<li className="dropdown">
		        		<div href="#" className="button dropdown-toggle flex">Language: <span id="selected-language">Chinese Simplified</span>&nbsp;<ChevronDownIcon  width={14}/></div>
		      		</li>
		    	</ul>
        </a>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col p-2 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
            <li className='flex justify-center items-center'>
              <a href="https://www.patreon.com/10fastfingers" target="_blank"><img src="https://10fastfingers.com/img/sonstiges/patreon.png?1656498999" alt="Become a patron" /></a>
              <a href="#" className=" py-2 pr-4 pl-3 text-white font-normal">论坛</a>
              <a href="#" className=" py-2 pr-4 pl-3 text-white font-normal">FAQ</a>
              <a href="#" className=" py-2 pr-4 pl-3 text-white font-normal">Supporter</a>
            </li>
           
          </ul>
          <div className='text-right text-white font-normal mr-12 p-1'>登录/创建账户</div>
       
        </div>
        
      </div>
      <div className='flex'>

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