import React from 'react';

import Navbar from '../components/Navbar';


const Main = (props) => (
  <div className="relative ">
    <Navbar />
    <div className="w-full px-0 md:px-1 antialiased bg-body">

      <div className="mx-auto">
        <div className="py-5">{props.children}</div>
      </div>
    </div>
  </div>
);

export { Main };
