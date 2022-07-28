import React from 'react';

import Navbar from '../components/Navbar';


const Main = (props) => (
  <div className="relative ">
    <Navbar />
    <div className="w-full px-0 md:px-1 antialiased bg-body-wrap ">
      <div className="mx-auto">
        <div className="py-5">{props.children}</div>
      </div>
    </div>
    <div className='bg-black w-full grid grid-cols-12 p-4'>
      <div className='col-span-1'></div>
      <div className='col-span-4'>
        <div className=' text-white text-4xl mb-2'>About</div>
        <ul class="nav nav-pills nav-stacked text-[#428bca] pl-8 ul-bottom">
					<li><a href="/impressum">Impressum</a></li>
					<li><a href="//10fastfingers.com/impressum#privacy-policy" rel="nofollow">Privacy Policy / Datenschutzerklärung</a></li>
					<li><a href="//10fastfingers.com/cookie-policy" rel="nofollow">Cookie Policy</a></li>
					<li><a href="//10fastfingers.com/gdpr" rel="nofollow">GDPR / DSGVO FAQ</a></li>
          <li><a href="http://twitter.com/10FastFingers_" rel="external nofollow" target="_blank">Twitter @10FastFingers_</a></li>
          <li><a href="/supporter">Supporter</a></li>
					<li><a href="/pages/whitelabel-typing-test">Whitelabel Typing Test</a></li>
					<li id="founded">Founded on October 17th 2007</li>
				</ul>
      </div>
      <div  className='col-span-4'>
        <div className=' text-white text-4xl mb-2'>Typing Test</div>
        <ul class="nav nav-pills nav-stacked text-[#428bca] pl-8 ul-bottom">
					<li><a href="//10fastfingers.com/forum" target="_blank">Forum</a></li>
					<li><a href="//10fastfingers.com/translations">Translate 10FastFingers</a></li>
					<li><a href="/faq">FAQ</a></li>
					<li><a href="https://10fastfingers.com/typing-test/english">Typing Test</a></li>
					<li><a href="/achievements">Typing Achievements</a></li>
				</ul>
      </div>
    </div>
  </div>
);

export { Main };
